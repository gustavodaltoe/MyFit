import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { FoodModule } from './food/food.module';

@Module({
  imports: [TypeOrmModule.forRoot(), UserModule, FoodModule],
})
export class AppModule {}
