import { IsInt, IsNotEmpty } from 'class-validator';

export class ProfileDto {
  @IsNotEmpty()
  name: string;

  @IsInt()
  height: number;

  @IsInt()
  weight: number;

  @IsNotEmpty()
  gender: string;

  @IsNotEmpty()
  physicalActivity: string;

  @IsInt()
  age: number;

  @IsNotEmpty()
  goal: string;
}
