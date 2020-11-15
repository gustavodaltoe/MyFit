import { differenceInMinutes } from 'date-fns';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import User from '../user/user.entity';

@Entity('email-verification')
export class EmailVerification {
  @PrimaryGeneratedColumn('uuid')
  token: string;

  @Column('timestamp')
  timestamp: Date;

  @Column({ default: false })
  verified: boolean;

  @OneToOne(() => User, user => user.emailVerification, {
    eager: true,
  })
  user: User;

  getEmailLifetimeInMinutes(): number {
    const timeNow = new Date();
    return differenceInMinutes(timeNow, this.timestamp);
  }
}
