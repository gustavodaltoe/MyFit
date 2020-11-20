type ProfileDto = {
  id: string;
  name: string;
  height: number;
  weight: number;
  gender: string;
  physicalActivity: string;
  age: number;
  goal: string;
  createdAt?: Date;
};

export default ProfileDto;
