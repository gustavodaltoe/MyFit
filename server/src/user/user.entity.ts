import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Food from '../food/food.entity';
import { EmailVerification } from '../auth/email-verification.entity';
import Profile from './profile.entity';

@Entity('users')
export default class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Exclude()
  @Column()
  password: string;

  @OneToOne(() => Profile, profile => profile.user, {
    nullable: true,
    cascade: true,
    eager: true,
  })
  @JoinColumn()
  profile?: Profile;

  @Exclude()
  @Column({ name: 'email_verification_id', nullable: true })
  emailVerificationId?: string;

  @Exclude()
  @OneToOne(() => EmailVerification, verification => verification.user, {
    cascade: true,
    nullable: true,
  })
  @JoinColumn({ name: 'email_verification_id' })
  emailVerification?: EmailVerification;

  @Column({ default: false })
  verified: boolean;

  @ManyToMany(() => Food, food => food.users)
  @JoinTable()
  foods: Food[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
