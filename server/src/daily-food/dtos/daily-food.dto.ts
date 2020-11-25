import { IsDateString, IsInt, IsNotEmpty, IsPositive } from 'class-validator';

export class DailyFoodDto {
  @IsDateString()
  date: Date;

  @IsNotEmpty()
  lunchPeriod: string;

  @IsInt()
  foodId: number;

  @IsInt()
  @IsPositive()
  amount: number;
}
