import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(private route: ActivatedRoute, private router: Router, private service: MealService) {
    this.inputs = {
      id: 1,
      image: "pizzaDemo.png",
      restaurantName: "Mc Donalds",
      type: "VegetarianIcon.svg",
      stars: 4,
      description: "This is a Mc Donalds"
    };

   

    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation()?.extras?.state?.['inputs'] != undefined) {
        this.inputs = this.router.getCurrentNavigation()?.extras?.state?.['inputs'];
        localStorage.setItem("inputs", JSON.stringify(this.inputs));
      } else {
        this.inputs = JSON.parse(localStorage.getItem("inputs")!);
      }
    });
  }

  ngOnInit() {
    this.service.addDynamicComponent({ id: 1, name: "Pizza Diavolo", price: parseFloat((Math.random() * 16 + 4).toFixed(2)), type: "vegetarian", descr: "Tomaten, Käse, Salami, Schinken, Pfefferoni" });
    this.service.addDynamicComponent({ id: 1, name: "Pizza Diavolo", price:parseFloat((Math.random() * 16 + 4).toFixed(2)), type: "meat", descr: "Tomaten, Käse, Salami, Schinken, Pfefferoni" });
    for(let i = 0; i < 20; i++) {
      this.service.addDynamicComponent({ id: 1, name: "Pizza Diavolo", price: parseFloat((Math.random() * 16 + 4).toFixed(2)), type: "vegetarian" });
    }
  }


  @ViewChild('favouriteStarWrapper') d1!:ElementRef;
  ngAfterViewInit() {
    if(false){
      this.d1.nativeElement.insertAdjacentHTML('beforeend', '<ion-icon name="star-outline" style="color: grey"></ion-icon>');
    }else{
      this.d1.nativeElement.insertAdjacentHTML('beforeend', '<ion-icon name="star" style="color: yellow"></ion-icon>');
    }
   
  }
}
