import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ProfileDto } from './dtos/profile.dto';
import User from './user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    return this.userService.findOne(id);
  }

  @Post('profile')
  @UseGuards(JwtAuthGuard)
  async createProfile(
    @Request() req,
    @Body() profile: ProfileDto,
  ): Promise<any> {
    return this.userService.createProfile(req.user.userId, profile);
  }
}
