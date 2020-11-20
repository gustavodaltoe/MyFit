import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { plainToClass } from 'class-transformer';
import { RegisterDto } from '../auth/dtos/register.dto';
import User from './user.entity';
import { ProfileDto } from './dtos/profile.dto';
import Profile from './profile.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
  ) {}

  async findOne(id: string): Promise<User> {
    return this.userRepository.findOne(id);
  }

  async findOneByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ email });
  }

  async create(dto: RegisterDto): Promise<User> {
    const { email, password } = dto;

    const isEmailAvailable = await this.isEmailAvailable(email);
    if (!isEmailAvailable) {
      throw new BadRequestException({
        message: 'The email already exists.',
        errors: { email: 'The email already exists.' },
      });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const user = await this.userRepository.save({
      email,
      password: hashedPassword,
    });

    return plainToClass(User, user);
  }

  async createProfile(userId: string, profileDto: ProfileDto): Promise<User> {
    const user = await this.userRepository.findOneOrFail(userId);

    user.profile = this.profileRepository.create({ ...profileDto });

    return this.userRepository.save(user);
  }

  private async isEmailAvailable(email: string): Promise<boolean> {
    const user = await this.userRepository.findOne({ email });
    return !user;
  }
}
