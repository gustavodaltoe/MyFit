import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateFoodDto {
  @IsNotEmpty()
  @MaxLength(50)
  name: string;

  @IsNotEmpty()
  @MaxLength(50)
  brand: string;

  @IsNumber()
  @Min(0)
  carbo: number;

  @IsNumber()
  @Min(0)
  protein: number;

  @IsNumber()
  @Min(0)
  fat: number;

  @IsNumber()
  @IsPositive()
  calories: number;

  @IsNumber()
  @IsPositive()
  portion: number;

  @IsNotEmpty()
  @MaxLength(15)
  unitMeasure: string;
}
