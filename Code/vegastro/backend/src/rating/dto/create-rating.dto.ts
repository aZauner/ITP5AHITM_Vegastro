import { AllergicType } from "src/schema/meal.schema";
import { FoodType, LocationRestaurant, Restaurant } from "src/schema/restaurant.schema";
import { User } from "src/schema/user.schema";

export class CreateRatingDto {
    userToken: string;
    restaurant: Restaurant;
    stars: number;
    comment: string;
    date: Date;
}
