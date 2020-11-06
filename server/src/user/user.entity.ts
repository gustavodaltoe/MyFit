import { Exclude } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column()
  height: number;

  @Column()
  weight: number;

  @Column()
  gender: string;

  @Column()
  physicalActivity: string;

  @Column()
  age: number;

  @Column()
  goal: string;
}
