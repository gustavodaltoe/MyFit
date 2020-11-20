import ProfileDto from '../dtos/ProfileDto';
import UserDto from '../dtos/UserDto';
import api from './api';

async function createProfile(profile: ProfileDto): Promise<UserDto> {
  const { data } = await api.post<UserDto>('/api/user/profile', profile);
  return data;
}

function calcProfileNecessities(profile: ProfileDto): any {
  const { weight, physicalActivity, goal } = profile;
  const proteinIndexPerKg = 2.5;
  const fatIndexPerKg = 0.6;

  const basalMetabolicRate = calcBasalMetabolicRate(profile);

  enum ActivityLevelEn {
    low = 1.2,
    moderate = 1.375,
    high = 1.55,
    very_high = 1.725,
    hyperactive = 1.9,
  }

  enum GoalsEn {
    weight_loss = 0.8,
    weight_loss_slow = 0.9,
    weight_keep = 0,
    weight_gain_slow = 1.1,
    weight_gain = 1.2,
  }

  const caloriesPerDay = Math.round(
    basalMetabolicRate * ActivityLevelEn[physicalActivity] * GoalsEn[goal],
  );

  const proteins = Math.round(weight * proteinIndexPerKg);
  const fat = Math.round(weight * fatIndexPerKg);

  const caloriesPerDayWithoutCarbs = 4 * proteins + 9 * fat;
  const maxCarbsCalories = caloriesPerDay - caloriesPerDayWithoutCarbs;

  const carbs = Math.round(maxCarbsCalories / 4);

  return {
    basalMetabolicRate,
    calories: caloriesPerDay,
    proteins,
    carbs,
    fat,
  };
}

// Mifflin-St Jeor formula
function calcBasalMetabolicRate({
  weight,
  height,
  age,
  gender,
}: ProfileDto): number {
  const s = gender === 'M' ? 5 : -161;
  return Math.round(10 * weight + 6.25 * height - 5 * age + s);
}

export default { createProfile, calcProfileNecessities };
