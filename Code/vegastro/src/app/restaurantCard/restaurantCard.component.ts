import { Component, Input } from '@angular/core';

export interface RestaurantCardInputs {
  image: string,
  restaurantName: string,
  type: "MeatIcon.svg" | "VegetarianIcon.svg" | "VeganIcon.svg" | "meat" | "vegetarian" | "vegan",
  stars: number,
  description: string
}


@Component({
  selector: 'restaurant-card',
  templateUrl: 'restaurantCard.component.html',
  styleUrls: ['restaurantCard.component.scss']
})

export class RestaurantCard {
  defaultInputs: RestaurantCardInputs = {
    image: "pizzaDemo.png",
    restaurantName: "Mc Donalds",
    type: "VegetarianIcon.svg",
    stars: 4,
    description: "This is a Mc Donalds"
  };

  inputs: any = this.defaultInputs;
}
