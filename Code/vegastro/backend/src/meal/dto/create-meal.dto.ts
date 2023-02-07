import { AllergicType } from "src/schema/meal.schema";
import { FoodType } from "src/schema/restaurant.schema";

export class CreateMealDto {
    title: string;
    description: string;
    type: FoodType;
    price: number;
    allergic: AllergicType;
}
