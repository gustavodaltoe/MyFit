import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export default class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Exclude()
  @Column()
  password: string;

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

  @CreateDateColumn({ name: 'created_at' })
  createdAt?: Date;
}
