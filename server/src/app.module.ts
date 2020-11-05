import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { FoodModule } from './food/food.module';

@Module({
  imports: [UserModule, FoodModule],
})
export class AppModule {}
