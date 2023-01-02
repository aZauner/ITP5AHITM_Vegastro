import { Component } from '@angular/core';

export interface MealInputs {
  id: number,
  name: string,
  price: number,
  type: "MeatIcon.svg" | "VegetarianIcon.svg" | "VeganIcon.svg" | "meat" | "vegetarian" | "vegan",
  descr?: string
}

@Component({
  selector: 'meal',
  templateUrl: 'meal.component.html',
  styleUrls: ['meal.component.scss']
})

export class Meal {
  defaultInputs: MealInputs = {
    id: 1,
    name: "Pizza Diavolo",
    price: 12.50,
    type: "VegetarianIcon.svg",
    descr: "This is a simple Pizza"
  };

  inputs: MealInputs = this.defaultInputs;

}
