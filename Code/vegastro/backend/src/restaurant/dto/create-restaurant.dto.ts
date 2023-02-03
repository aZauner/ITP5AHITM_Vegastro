import { FoodType, LocationRestaurant } from "src/schema/restaurant.schema";
import { User } from "src/schema/user.schema";

export class CreateRestaurantDto {
    restaurantName: string;
    latitude: number;
    longitude: number;
    owner: string | User;
    type: FoodType;
    description: string;
    location: LocationRestaurant;
}
