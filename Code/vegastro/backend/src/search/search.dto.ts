export class DataSet {
    indexName: string;
    restaurants: RestaurantDto[];
}

export class RestaurantDto {
    id: string;
    restaurantName: string;
    description: string;
    location: Location;
    menu: Meal[]
}

export class Meal {
    title: string;
    description: string;
}


export class Location {
    street: string;
    plz: string;
    city: string;
}

export class DeleteInput {
    indexName: string;
    id?: string;
}

export class searchByKeyword {
    keyword: string;
}