import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  Response,
  UseGuards,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import User from '../user/user.entity';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';
import { RegisterDto } from './dtos/register.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { AccessToken } from './types/access-token';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Post('register')
  async register(@Body() user: RegisterDto): Promise<User> {
    const createdUser = await this.userService.create(user);

    const { token } = await this.authService.createEmailToken(user.email);
    await this.authService.sendEmailVerification(token);

    return createdUser;
  }

  @Post('login')
  async login(@Body() user: LoginDto): Promise<AccessToken> {
    return this.authService.login(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getCurrentUser(@Request() req): Promise<User> {
    return this.authService.getProfile(req.user.email);
  }

  @Post('email/resend')
  async resendEmailVerification(
    @Body('email') email: string,
    @Response() resp,
  ): Promise<void> {
    const { token } = await this.authService.createEmailToken(email);
    await this.authService.sendEmailVerification(token);
    resp.status(204).send();
  }

  @Get('email/verify/:token')
  async verifyEmail(@Param() params, @Response() resp): Promise<void> {
    await this.authService.verifyEmail(params.token);
    resp.status(204).send();
  }
}
