export default interface UserDto {
  id: string;
  email: string;
  verified: boolean;
  createdAt: Date;
  profile?: {
    id: string;
    name: string;
    height: number;
    weight: number;
    gender: string;
    physicalActivity: string;
    age: number;
    goal: string;
    createdAt: Date;
  };
}
