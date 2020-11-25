import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { DailyFood } from './daily-food.entity';
import { DailyFoodService } from './daily-food.service';
import { DailyFoodDto } from './dtos/daily-food.dto';
import { ListDailyFoodDto } from './dtos/list-daily-food.dto';

@Controller('daily')
export class DailyFoodController {
  constructor(private readonly dailyFoodService: DailyFoodService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async list(
    @Request() req,
    @Query() { date }: ListDailyFoodDto,
  ): Promise<DailyFood[]> {
    return this.dailyFoodService.list(req.user.userId, new Date(date));
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @Request() req,
    @Body() dailyFood: DailyFoodDto,
  ): Promise<DailyFood> {
    return this.dailyFoodService.create(req.user.userId, dailyFood);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(@Request() req, @Param('id') id: number): Promise<void> {
    return this.dailyFoodService.delete(req.user.userId, id);
  }
}
