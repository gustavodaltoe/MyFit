import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RegisterDto } from '../auth/dtos/register.dto';
import User from './user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    return this.userService.findOne(id);
  }
}
