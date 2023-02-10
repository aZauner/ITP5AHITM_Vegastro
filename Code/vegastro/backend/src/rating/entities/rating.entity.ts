import { Meal } from "src/schema/meal.schema";
import { FoodType, LocationRestaurant } from "src/schema/restaurant.schema";
import { User } from "src/schema/user.schema";

export interface RatingDetails {
    id: string;
    userToken: string;
    stars: number;
}
