import { IsDateString } from 'class-validator';

export class ListDailyFoodDto {
  @IsDateString()
  date: string;
}
