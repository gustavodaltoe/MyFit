import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Request,
  Response,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateFoodDto } from './dtos/create-food.dto';
import FindFoodDto from './dtos/find-food.dto';
import Food from './food.entity';
import { FoodService } from './food.service';

@Controller()
export class FoodController {
  constructor(private readonly foodService: FoodService) {}

  @Get('foods')
  @UseGuards(JwtAuthGuard)
  async find(@Query() query: FindFoodDto): Promise<Food[]> {
    return this.foodService.find(query.name);
  }

  @Post('foods')
  @UseGuards(JwtAuthGuard)
  async create(@Request() req, @Body() food: CreateFoodDto): Promise<Food> {
    return this.foodService.create(req.user.userId, food);
  }

  @Get('user/foods')
  @UseGuards(JwtAuthGuard)
  async list(@Request() req): Promise<Food[]> {
    return this.foodService.list(req.user.userId);
  }

  @Patch('user/foods/:foodId')
  @UseGuards(JwtAuthGuard)
  async attachToUser(
    @Response() res,
    @Request() req,
    @Param() params,
  ): Promise<void> {
    await this.foodService.attachToUser(req.user.userId, params.foodId);
    res.status(204).send();
  }

  @Delete('user/foods/:foodId')
  @UseGuards(JwtAuthGuard)
  async detachFromUser(@Request() req, @Param() params): Promise<void> {
    await this.foodService.detachFromUser(req.user.userId, params.foodId);
  }
}
