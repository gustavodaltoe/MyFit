import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import User from '../user/user.entity';
import { FoodController } from './food.controller';
import Food from './food.entity';
import { FoodService } from './food.service';

@Module({
  imports: [TypeOrmModule.forFeature([Food, User])],
  controllers: [FoodController],
  providers: [FoodService],
})
export class FoodModule {}
