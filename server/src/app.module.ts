import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { FoodModule } from './food/food.module';
import { AuthModule } from './auth/auth.module';
import { DailyFoodModule } from './daily-food/daily-food.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({ autoLoadEntities: true }),
    FoodModule,
    UserModule,
    AuthModule,
    DailyFoodModule,
  ],
})
export class AppModule {}
