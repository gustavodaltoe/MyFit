import { Exclude } from 'class-transformer';
import User from 'src/user/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export default class Food {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  brand: string;

  @Column('decimal', { scale: 1 })
  carbo: number;

  @Column('decimal', { scale: 1 })
  protein: number;

  @Column('decimal', { scale: 1 })
  fat: number;

  @Column('int')
  calories: number;

  @Column('int')
  portion: number;

  @Column({ name: 'unit_measure' })
  unitMeasure: string;

  @Exclude()
  @ManyToMany(() => User, user => user.foods)
  users: User[];

  @Column('int', { default: 1 })
  popularity: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt?: Date;
}
