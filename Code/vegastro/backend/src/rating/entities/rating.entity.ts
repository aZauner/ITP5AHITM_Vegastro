import { Meal } from "src/schema/meal.schema";
import { FoodType, LocationRestaurant, Restaurant } from "src/schema/restaurant.schema";
import { User } from "src/schema/user.schema";

export interface RatingDetails {
    id: string;
    userToken: string;
    restaurant: Restaurant;
    stars: number;
    comment: string;
}
