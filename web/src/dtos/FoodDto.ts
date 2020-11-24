export default interface FoodDto {
  id?: number;

  name: string;

  brand: string;

  carbo: number;

  protein: number;

  fat: number;

  calories: number;

  portion: number;

  unitMeasure: string;

  createdAt?: Date;
}
