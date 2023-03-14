import { Restaurant } from "src/schema/restaurant.schema";

export interface UserDetails {
    id: string;
    firstname: string;
    lastname: string;
    username: string;
    email: string;
    favouriteRestaurants: [Restaurant],
    token: string;
    password: string
}
