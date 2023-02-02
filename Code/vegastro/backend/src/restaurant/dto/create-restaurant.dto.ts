import { User } from "src/schema/user.schema";

export class CreateRestaurantDto {
    restaurantName: string;
    latitude: number;
    longitude: number;
    owner: string | User;
}
