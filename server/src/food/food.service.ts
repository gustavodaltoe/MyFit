import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import User from '../user/user.entity';
import { CreateFoodDto } from './dtos/create-food.dto';
import Food from './food.entity';

@Injectable()
export class FoodService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Food)
    private foodRepository: Repository<Food>,
  ) {}

  async list(userId: string): Promise<Food[]> {
    const user = await this.userRepository.findOneOrFail(userId, {
      relations: ['foods'],
    });

    return user.foods.reverse();
  }

  async find(name?: string): Promise<Food[]> {
    const foods = await this.foodRepository
      .createQueryBuilder('posts')
      .where('LOWER(posts.name) LIKE LOWER(:name)', { name: `%${name || ''}%` })
      .orderBy('posts.popularity', 'DESC')
      .getMany();

    return foods;
  }

  async create(userId: string, foodDto: CreateFoodDto): Promise<Food> {
    const user = await this.userRepository.findOneOrFail(userId);

    const food = this.foodRepository.create(foodDto);
    food.users = [user];

    return this.foodRepository.save(food);
  }

  async attachToUser(userId: string, foodId: number): Promise<void> {
    const authUser = await this.userRepository.findOneOrFail(userId);

    const food = await this.foodRepository.findOneOrFail(foodId, {
      relations: ['users'],
    });

    const foodAlreadyAttached = !!food.users.find(
      user => user.id === authUser.id,
    );
    if (foodAlreadyAttached) {
      return;
    }

    food.users = [...food.users, authUser];
    food.popularity += 1;
    await this.foodRepository.save(food);
  }

  async detachFromUser(userId: string, foodId: number): Promise<void> {
    const authUser = await this.userRepository.findOneOrFail(userId);

    const food = await this.foodRepository.findOneOrFail(foodId, {
      relations: ['users'],
    });

    food.users = food.users.filter(user => user.id !== authUser.id);
    food.popularity -= 1;
    await this.foodRepository.save(food);
  }
}
