import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Restaurant, RestaurantSchema } from '../schema/restaurant.schema';
import { User, UserSchema } from 'src/schema/user.schema';
import { UserModule } from 'src/user/user.module';
import { Meal, MealSchema } from 'src/schema/meal.schema';
import { Rating, RatingSchema } from 'src/schema/rating.schema';
import { RatingupvoteService } from './ratingupvotes.service';
import { RatingupvoteController } from './ratingupvotes.controller';
import { Ratingupvotes, RatingupvotesSchema } from 'src/schema/ratingupvotes.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Ratingupvotes.name,
        schema: RatingupvotesSchema
      }
    ])
  ],
  providers: [RatingupvoteService],
  controllers: [RatingupvoteController],
})
export class RatingupvotesModule { }
