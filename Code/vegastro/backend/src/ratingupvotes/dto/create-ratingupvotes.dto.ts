import { AllergicType } from "src/schema/meal.schema";
import { FoodType, LocationRestaurant, Restaurant } from "src/schema/restaurant.schema";
import { User } from "src/schema/user.schema";

export class CreateRatingUpvoteDto {
    userToken: string;
    ratingId: string;    
}
