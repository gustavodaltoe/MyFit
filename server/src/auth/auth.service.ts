import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import * as nodemailer from 'nodemailer';
import { InjectRepository } from '@nestjs/typeorm';
import User from '../user/user.entity';
import { UserService } from '../user/user.service';
import { LoginDto } from './dtos/login.dto';
import { EmailVerification } from './email-verification.entity';
import { AccessToken } from './types/access-token';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(EmailVerification)
    private emailVerificationRepository: Repository<EmailVerification>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<User | null> {
    const user = await this.userService.findOneByEmail(email);
    if (!user) {
      return null;
    }

    const passwordMatch = bcrypt.compareSync(pass, user.password);
    return passwordMatch ? user : null;
  }

  async login({ email, password }: LoginDto): Promise<AccessToken> {
    const user = await this.validateUser(email, password);

    if (!user) {
      throw new UnauthorizedException();
    }

    const payload = { email, sub: user.id };

    return { accessToken: this.jwtService.sign(payload) };
  }

  async getProfile(email: string): Promise<User> {
    return this.userService.findOneByEmail(email);
  }

  async createEmailToken(email: string): Promise<EmailVerification> {
    const user = await this.userService.findOneByEmail(email);
    if (!user) {
      throw new ForbiddenException('REGISTER.EMAIL_NOT_FOUND');
    }

    const emailVerificationSent = await this.emailVerificationRepository.findOne(
      user.emailVerificationId,
    );
    if (emailVerificationSent.verified) {
      throw new ForbiddenException('REGISTER.EMAIL_ALREADY_CONFIRMED');
    }
    if (emailVerificationSent.getEmailLifetimeInMinutes() < 5) {
      throw new InternalServerErrorException('LOGIN.EMAIL_SENT_RECENTLY');
    }

    const emailVerification = this.emailVerificationRepository.create({
      user,
      timestamp: new Date(),
    });
    return this.emailVerificationRepository.save(emailVerification);
  }

  async sendEmailVerification(token: string): Promise<boolean> {
    const emailVerification = await this.emailVerificationRepository.findOne(
      token,
    );
    if (!emailVerification) {
      throw new ForbiddenException('REGISTER.USER_NOT_REGISTERED');
    }

    const { user } = emailVerification;

    const html = `
      <p>Hi!</p>
      <p>Thanks for your registration</p>
      <br>
      <a href="${process.env.WEB_APP_URI}/confirmation?token=${token}">
        Click here to activate your account
      </a>
    `;

    const mailOptions = {
      from: 'MyFit',
      to: `${user.email}`, // list of receivers (separated by ,)
      subject: 'Email Verification - MyFit',
      html,
    };

    return nodemailer
      .createTransport({
        host: process.env.MAILER_HOST,
        port: process.env.MAILER_PORT,
        secure: process.env.MAILER_SECURE === 'true', // true for 465, false for other ports
        auth: {
          user: process.env.MAILER_USER,
          pass: process.env.MAILER_PASSWORD,
        },
      })
      .sendMail(mailOptions, async err => {
        if (err) {
          console.log(`Failed to send mail: ${err}`);
          return false;
        }
        return true;
      });
  }

  async verifyEmail(token: string): Promise<void> {
    const emailVerification = await this.emailVerificationRepository.findOneOrFail(
      token,
    );
    emailVerification.verified = true;
    await this.emailVerificationRepository.save(emailVerification);

    const { user } = emailVerification;
    user.verified = true;
    await this.userRepository.save(user);
  }
}
