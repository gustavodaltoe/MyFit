import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { endOfDay, startOfDay } from 'date-fns';
import Food from 'src/food/food.entity';
import User from 'src/user/user.entity';
import { Between, Repository } from 'typeorm';
import { DailyFood } from './daily-food.entity';
import { DailyFoodDto } from './dtos/daily-food.dto';

@Injectable()
export class DailyFoodService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Food)
    private foodRepository: Repository<Food>,
    @InjectRepository(DailyFood)
    private dailyFoodRepository: Repository<DailyFood>,
  ) {}

  async create(userId: string, dailyFoodDto: DailyFoodDto): Promise<DailyFood> {
    const user = await this.userRepository.findOneOrFail(userId);

    const food = await this.foodRepository.findOneOrFail(dailyFoodDto.foodId);
    const dailyFood = this.dailyFoodRepository.create({
      ...dailyFoodDto,
      user,
      food,
    });

    return this.dailyFoodRepository.save(dailyFood);
  }

  async list(userId: string, date: Date): Promise<DailyFood[]> {
    const user = await this.userRepository.findOneOrFail(userId);

    const startOfDayFromDate = startOfDay(date);
    const endOfDayFromDate = endOfDay(date);
    const dailyFoods = await this.dailyFoodRepository.find({
      user,
      date: Between(startOfDayFromDate, endOfDayFromDate),
    });

    return dailyFoods;
  }

  async delete(userId: string, dailyFoodId: number): Promise<void> {
    const authUser = await this.userRepository.findOneOrFail(userId);
    const dailyFood = await this.dailyFoodRepository.findOneOrFail(
      dailyFoodId,
      { relations: ['user'] },
    );

    if (dailyFood.user.id !== authUser.id) {
      throw new UnauthorizedException('Permissão negada.');
    }

    await this.dailyFoodRepository.remove(dailyFood);
  }
}
