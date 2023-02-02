import { User } from "src/schema/user.schema";

export interface RestaurantDetails {
    id: string;
    restaurantName: string;
    latitude: number;
    longitude: number;
    owner: User;
}
