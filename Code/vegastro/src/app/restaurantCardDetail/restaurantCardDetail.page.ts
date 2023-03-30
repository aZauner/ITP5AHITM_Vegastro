import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonModal, ToastController } from '@ionic/angular';
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
  ratingComment: string = "";
  userStarRating: number = 0;
  mealDevisionInputs = {
    meat: 0,
    vegan: 0,
    vegetarian: 0
  }
  comments = []

  roundedStarRating = 0;
  restaurantRated = false;

  constructor(private route: ActivatedRoute, private router: Router, private service: MealService, private toastController: ToastController) {
    this.inputs = {
      id: "1",
      image: "pizzaDemo.png",
      restaurantName: "Mc Donalds",
      type: "VegetarianIcon.svg",
      stars: 4,
      description: "This is a Mc Donalds",
      isFav: false
    };

    this.oldInputs = {
      id: "1",
      image: "pizzaDemo.png",
      restaurantName: "Mc Donalds",
      type: "VegetarianIcon.svg",
      stars: 4,
      description: "This is a Mc Donalds",
      isFav: false
    };

    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation()?.extras?.state?.['inputs'] != undefined) {
        this.inputs = this.router.getCurrentNavigation()!.extras!.state!["inputs"];
      }
    });
  }

  ngDoCheck() {

    if (this.inputs !== this.oldInputs) {
      this.roundedStarRating =  Math.round(this.inputs.stars * 100) / 100  
      document.getElementById("meals")!.innerHTML = '';
      this.mealDivision(this.inputs);
      
      if (this.inputs.menu != null) {
        for (const meal of this.inputs.menu) {
          if (meal.description) {
            this.service.addDynamicComponent({ id: meal._id, name: meal.title, price: meal.price, type: meal.type, descr: meal.description });
          } else {
            this.service.addDynamicComponent({ id: meal._id, name: meal.title, price: meal.price, type: meal.type });
          }
        }
      }

      //ratings laden
      axios.get('http://localhost:3000/rating/byRestaurant/' + this.inputs.id).then((response) => {
        this.comments = response.data
        if (response.data.length > 0) {
          for (const comment of response.data) {
            if (comment.userToken! == sessionStorage.getItem('userToken')) {
              this.restaurantRated = true;
            }
          }
        } else {
          this.restaurantRated = false;
        }
      })

      this.oldInputs = this.inputs;
    }
  }

  mealDivision(inputs: any) {
    let devisionPerMeal = {
      meat: 0,
      vegan: 0,
      vegetarian: 0
    }

    if (inputs.menu.length > 0) {
      for (let i = 0; i < inputs.menu.length; i++) {
        if (inputs.menu[i].type == 'meat') {
          devisionPerMeal.meat++
        }
        else if (inputs.menu[i].type == 'vegetarian') {
          devisionPerMeal.vegetarian++
        }
        else if (inputs.menu[i].type == 'vegan') {
          devisionPerMeal.vegan++
        }
      }

      devisionPerMeal.meat = devisionPerMeal.meat / inputs.menu.length;
      devisionPerMeal.vegetarian = devisionPerMeal.vegetarian / inputs.menu.length
      devisionPerMeal.vegan = devisionPerMeal.vegan / inputs.menu.length
      
    }
    this.mealDevisionInputs = devisionPerMeal;

  }

  addFavRestaurant() {
    if (sessionStorage.getItem('favouriteRestaurants')) {
      this.inputs.isFav = !this.inputs.isFav;
      let favRests = JSON.parse(sessionStorage.getItem('favouriteRestaurants')!);
      favRests.push(this.inputs.id);
      sessionStorage.setItem('favouriteRestaurants', JSON.stringify(favRests));
      axios.put('http://localhost:3000/user/addFvouriteRestaurant', {
        "restId": this.inputs.id,
        "token": sessionStorage.getItem('userToken')
      })
    } else {
      this.callToast(1300)
    }
  }

  async callToast(duration: number) {
    const toast = await this.toastController.create({
      message: 'Nicht angemeldet',
      duration: duration,
      position: 'middle',
      icon: 'person-circle-outline',
      cssClass: 'favToast',
      buttons: [
        {
          text: 'Anmelden',
          role: 'login',
          handler: () => { this.router.navigateByUrl("/login") }
        }
      ]
    });
    await toast.present();
  }

  async callInputErrorToast(duration: number) {
    const toast = await this.toastController.create({
      message: 'Beide Felder Müssen gesetzt sein',
      duration: duration,
      position: 'middle',      
      cssClass: 'favToast'      
    });
    await toast.present();
  }

  removeFavRestaurant() {
    if (sessionStorage.getItem('favouriteRestaurants')) {
      this.inputs.isFav = !this.inputs.isFav;
      let favRests: [string] = JSON.parse(sessionStorage.getItem('favouriteRestaurants')!);
      favRests.splice(favRests.indexOf(this.inputs.id), 1);
      sessionStorage.setItem('favouriteRestaurants', JSON.stringify(favRests));
      axios.put('http://localhost:3000/user/removeFvouriteRestaurant', {
        "restId": this.inputs.id,
        "token": sessionStorage.getItem('userToken')
      })
    }
  }

  @ViewChild(IonModal)
  modal!: IonModal;

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    if (sessionStorage.getItem('userToken')) {
      

      if(this.userStarRating != 0 && this.ratingComment != ''){
        axios.post('http://localhost:3000/rating/create', {
          userToken: sessionStorage.getItem('userToken'),
          restaurant: this.inputs.id,
          stars: this.userStarRating,
          comment: this.ratingComment
        }).then((response) => {
          this.restaurantRated = true;
        })
        this.modal.dismiss(null, 'confirm');
        setTimeout(() => {
          axios.get('http://localhost:3000/rating/byRestaurant/' + this.inputs.id).then((response) => {
            this.comments = response.data
            let sumStars = 0;
            if (response.data.length > 0) {
              for (const star of response.data) {
                sumStars += star.stars;
              }
              this.roundedStarRating = Math.round((sumStars / response.data.length) * 100) / 100
            }
          })
        }, 200)        
      }else{
        this.callInputErrorToast(1300)        
      }
    } else {
      this.callToast(1600)
    }
  }


  ratingChanged(event: number) {
    this.userStarRating = event;
  }

  scrollToComments() {
    document.getElementById('comments')?.scrollIntoView()
  }
}
