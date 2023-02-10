import { Module } from '@nestjs/common';
import { RatingService} from './rating.service';
import { RatingController } from './rating.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Restaurant, RestaurantSchema } from '../schema/restaurant.schema';
import { User, UserSchema } from 'src/schema/user.schema';
import { UserModule } from 'src/user/user.module';
import { Meal, MealSchema } from 'src/schema/meal.schema';
import { Rating, RatingSchema } from 'src/schema/rating.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Rating.name,
        schema: RatingSchema
      }
    ])
  ],
  providers: [RatingService],
  controllers: [RatingController],
})
export class RatingModule { }
