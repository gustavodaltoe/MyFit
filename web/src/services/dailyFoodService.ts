import CreateDailyFoodDto from '../dtos/CreateDailyFoodDto';
import DailyFoodDto from '../dtos/DailyFoodDto';
import api from './api';

async function list(date: Date): Promise<DailyFoodDto[]> {
  const { data } = await api.get('api/daily', {
    params: {
      date,
    },
  });
  return data;
}

async function create(dailyFood: CreateDailyFoodDto): Promise<DailyFoodDto> {
  const { data } = await api.post('api/daily', dailyFood);
  return data;
}

async function deleteDailyFood(id: number): Promise<void> {
  await api.delete(`api/daily/${id}`);
}

export default { list, create, deleteDailyFood };
