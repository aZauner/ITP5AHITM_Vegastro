import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../schema/user.schema';
import { Restaurant, RestaurantSchema } from 'src/schema/restaurant.schema';
import { Meal, MealSchema } from 'src/schema/meal.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema
      },
      {
        name: Restaurant.name,
        schema: RestaurantSchema
      },
      {
        name: Meal.name,
        schema: MealSchema
      }
    ])
  ],
  providers: [UserService],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}
