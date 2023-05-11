import { AllergicType } from "src/schema/meal.schema";
import { FoodType } from "src/schema/restaurant.schema";
import { User } from "src/schema/user.schema";

export interface MealDetails {
    id: string;
    title: string;
    description: string;
    type: FoodType;
    price: string;
    allergic: AllergicType;
    active: boolean;
}
 