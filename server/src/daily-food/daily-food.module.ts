import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DailyFoodController } from './daily-food.controller';
import { DailyFoodService } from './daily-food.service';
import Food from '../food/food.entity';
import User from '../user/user.entity';
import { DailyFood } from './daily-food.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Food, User, DailyFood])],
  controllers: [DailyFoodController],
  providers: [DailyFoodService],
})
export class DailyFoodModule {}
