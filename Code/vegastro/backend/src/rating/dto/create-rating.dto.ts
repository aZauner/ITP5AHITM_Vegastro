import { AllergicType } from "src/schema/meal.schema";
import { FoodType, LocationRestaurant } from "src/schema/restaurant.schema";
import { User } from "src/schema/user.schema";

export class CreateRatingDto {
    userToken: string;
    stars: number;
}
