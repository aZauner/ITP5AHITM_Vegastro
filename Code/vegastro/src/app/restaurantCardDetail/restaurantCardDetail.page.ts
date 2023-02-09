import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import axios from 'axios';
import { MealService } from '../meal/mealService';
import { RestaurantCardInputs } from '../restaurantCard/restaurantCard.component';

declare global {
  interface Window { inputs: RestaurantCardInputs; }
}

@Component({
  selector: 'restaurant-card-detail',
  templateUrl: 'restaurantCardDetail.page.html',
  styleUrls: ['restaurantCardDetail.page.scss']
})

export class RestaurantCardDetail {
  inputs: RestaurantCardInputs;
  oldInputs: RestaurantCardInputs;
  favourite = true;

  constructor(private route: ActivatedRoute, private router: Router, private service: MealService) {
    this.inputs = {
      id: "1",
      image: "pizzaDemo.png",
      restaurantName: "Mc Donalds",
      type: "VegetarianIcon.svg",
      stars: 4,
      description: "This is a Mc Donalds"
    };

    this.oldInputs = {
      id: "1",
      image: "pizzaDemo.png",
      restaurantName: "Mc Donalds",
      type: "VegetarianIcon.svg",
      stars: 4,
      description: "This is a Mc Donalds"
    };

    this.route.queryParams.subscribe(params => { 
      if (this.router.getCurrentNavigation()?.extras?.state?.['inputs'] != undefined) {
        this.inputs = this.router.getCurrentNavigation()!.extras!.state!["inputs"];
      }
    });
  }

  ngOnInit() {
    axios.get('http://localhost:3000/restaurant')
    .then(function (response) {
      console.log(response);
    })
  }
  
  ngDoCheck() {
    if(this.inputs !== this.oldInputs) {
      document.getElementById("meals")!.innerHTML = '';
      if(this.inputs.menu != null){
        
        for (const meal of this.inputs.menu) {
          if(meal.description) {
            this.service.addDynamicComponent({ id: meal._id, name: meal.title, price: meal.price, type: meal.type, descr: meal.description });
          } else {
            this.service.addDynamicComponent({ id: meal._id, name: meal.title, price: meal.price, type: meal.type });
          }
        }
      }
      this.oldInputs = this.inputs;
    }
  }
}
