import {
  Column,
  CreateDateColumn,
  Entity,
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

  @CreateDateColumn({ name: 'created_at' })
  createdAt?: Date;
}
