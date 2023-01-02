import { Component, Input } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

export interface RestaurantCardInputs {
  id: number,
  image: string,
  restaurantName: string,
  type: "MeatIcon.svg" | "VegetarianIcon.svg" | "VeganIcon.svg" | "meat" | "vegetarian" | "vegan",
  stars: number,
  description: string,
  preDescr?: string
}


@Component({
  selector: 'restaurant-card',
  templateUrl: 'restaurantCard.component.html',
  styleUrls: ['restaurantCard.component.scss']
})

export class RestaurantCard {
  defaultInputs: RestaurantCardInputs = {
    id: 1,
    image: "pizzaDemo.png",
    restaurantName: "Mc Donalds",
    type: "VegetarianIcon.svg",
    stars: 4,
    description: "This is a Mc Donalds"
  };

  inputs: any = this.defaultInputs;

  constructor(private router: Router) { }

  openDetails() {
    let navigationExtras: NavigationExtras = {
      state: {
        inputs: this.inputs
      }
    };
    this.router.navigate(['/tabs','restaurantDetail'], navigationExtras);
  }
}
