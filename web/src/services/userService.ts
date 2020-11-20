import ProfileDto from '../dtos/ProfileDto';
import UserDto from '../dtos/UserDto';
import api from './api';

async function createProfile(profile: ProfileDto): Promise<UserDto> {
  const { data } = await api.post<UserDto>('/api/user/profile', profile);
  return data;
}

export default { createProfile };
