type ProfileDto = {
  id: string;
  name: string;
  height: number;
  weight: number;
  gender: string;
  physicalActivity: 'low' | 'moderate' | 'high' | 'very_high' | 'hyperactive';
  age: number;
  goal:
    | 'weight_loss'
    | 'weight_loss_slow'
    | 'weight_keep'
    | 'weight_gain_slow'
    | 'weight_gain';
  createdAt?: Date;
};

export default ProfileDto;
