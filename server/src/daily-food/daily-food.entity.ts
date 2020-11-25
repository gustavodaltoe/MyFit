import { Exclude } from 'class-transformer';
import Food from 'src/food/food.entity';
import User from 'src/user/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class DailyFood {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: Date;

  @Column({ name: 'lunch_period' })
  lunchPeriod: string;

  @Exclude()
  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => Food, { eager: true })
  food: Food;

  @Column('int')
  amount: number;
}
