import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import User from '../user/user.entity';
import { UserService } from '../user/user.service';
import { LoginDto } from './dtos/login.dto';
import { AccessToken } from './types/access-token';

@Injectable()
export class AuthService {
  constructor(
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
}
