import { Module } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { RestaurantController } from './restaurant.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Restaurant, RestaurantSchema } from '../schema/restaurant.schema';
import { User, UserSchema } from 'src/schema/user.schema';
import { UserModule } from 'src/user/user.module';
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
  providers: [RestaurantService],
  exports: [RestaurantService],
  controllers: [RestaurantController]
})
export class RestaurantModule { }
