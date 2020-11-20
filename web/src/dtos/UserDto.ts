import ProfileDto from './ProfileDto';

export default interface UserDto {
  id: string;
  email: string;
  verified: boolean;
  createdAt: Date;
  profile?: ProfileDto;
}
