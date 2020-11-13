import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { plainToClass } from 'class-transformer';
import { CreateUserDto } from './dtos/create-user.dto';
import User from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findOne(id: string): Promise<User> {
    return this.userRepository.findOne(id);
  }

  async findOneByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ email });
  }

  async create(dto: CreateUserDto): Promise<User> {
    const { email, password } = dto;

    const isEmailAvailable = await this.isEmailAvailable(email);
    if (!isEmailAvailable) {
      throw new BadRequestException({
        message: 'Input data validation failed.',
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

  private async isEmailAvailable(email: string): Promise<boolean> {
    const user = await this.userRepository.findOne({ email });
    return !user;
  }
}
