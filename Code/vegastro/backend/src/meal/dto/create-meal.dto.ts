import { FoodType } from "src/schema/restaurant.schema";

export class CreateMealDto {
    title: string;
    description: string;
    type: FoodType
}
