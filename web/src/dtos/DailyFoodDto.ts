import FoodDto from './FoodDto';

export default interface DailyFoodDto {
  id: number;
  date: Date;
  lunchPeriod: string;
  amount: number;
  food: FoodDto;
}
