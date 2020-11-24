import FoodDto from '../dtos/FoodDto';
import api from './api';

async function createFood(food: FoodDto): Promise<FoodDto> {
  const { data } = await api.post<FoodDto>('/api/foods', food);
  return data;
}

async function list(): Promise<FoodDto[]> {
  const { data } = await api.get<FoodDto[]>('/api/user/foods');
  return data;
}

async function search(foodName?: string): Promise<FoodDto[]> {
  const { data } = await api.get<FoodDto[]>('/api/foods', {
    params: {
      name: foodName,
    },
  });
  return data;
}

async function addFoodToUser(foodId: number): Promise<void> {
  await api.patch(`/api/user/foods/${foodId}`);
}

async function removeFoodFromUser(foodId: number): Promise<void> {
  await api.delete(`/api/user/foods/${foodId}`);
}

export default {
  createFood,
  list,
  search,
  addFoodToUser,
  removeFoodFromUser,
};
