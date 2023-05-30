import { Meal } from "src/schema/meal.schema";
import { FoodType, LocationRestaurant, Restaurant } from "src/schema/restaurant.schema";
import { User } from "src/schema/user.schema";

export interface RatingupvotesDetail {
    id: string;
    userToken: string;    
    ratingId: string 
}
