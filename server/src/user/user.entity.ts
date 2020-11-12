import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Profile from './profile.entity';

@Entity()
export default class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Exclude()
  @Column()
  password: string;

  @Column({ default: false })
  verified: boolean;

  @OneToOne(() => Profile, profile => profile.user, {
    nullable: true,
    cascade: true,
  })
  @JoinColumn()
  profile?: Profile;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
