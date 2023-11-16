import { Module } from '@nestjs/common';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';
import { UserService } from 'src/user/user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schema/user.schema';
import { Meal, MealSchema } from 'src/schema/meal.schema';
import { Restaurant, RestaurantSchema } from 'src/schema/restaurant.schema';
import { Client } from '@opensearch-project/opensearch/.';
import { RestaurantService } from 'src/restaurant/restaurant.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema
      },
      {
        name: Meal.name,
        schema: MealSchema
      },
      {
        name: Restaurant.name,
        schema: RestaurantSchema
      }
    ])
  ],
  providers: [SearchService, RestaurantService],
  controllers: [SearchController],
})
export class SearchModule {}
