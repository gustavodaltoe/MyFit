import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import User from './user.entity';

@Entity({ name: 'user-profile' })
export default class Profile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('int')
  height: number;

  @Column('int')
  weight: number;

  @Column()
  gender: string;

  @Column({ name: 'physical_activity' })
  physicalActivity: string;

  @Column('int')
  age: number;

  @Column()
  goal: string;

  @OneToOne(() => User, user => user.profile)
  user: User;

  @CreateDateColumn({ name: 'created_at' })
  createdAt?: Date;
}
