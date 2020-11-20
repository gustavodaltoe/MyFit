import UserDto from '../dtos/UserDto';

export default interface User {
  info: UserDto;
  necessities?: {
    basalMetabolicRate: number;
    calories: number;
    carbs: number;
    proteins: number;
    fat: number;
  };
}
