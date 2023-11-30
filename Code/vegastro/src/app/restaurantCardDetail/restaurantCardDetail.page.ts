import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonModal, ToastController } from '@ionic/angular';
import axios from 'axios';
import { MealService } from '../meal/mealService';
import { RestaurantCardInputs } from '../restaurantCard/restaurantCard.component';
import { FavouritesPage } from '../favourites/favourites.page';
import { RestaurantCardService } from '../restaurantCard/RestaurantCardService';
import { UpdateService } from '../services/update.service';
import { Subscription } from 'rxjs';
import { BASE_URL } from '../constants';

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
  filter: "neueste" | 'hilfreich' = "hilfreich"
  oldInputs: RestaurantCardInputs;
  ratingComment: string = "";
  userStarRating: number = 0;
  mealDevisionInputs = {
    other: 0,
    vegan: 0,
    vegetarian: 0
  }
  comments: [{ id: string; comment: string; stars: number; user: { id: number }; date: Date }?] = []


  roundedStarRating = 0;
  restaurantRated = false;

  updateSubscription: Subscription;

  constructor(private route: ActivatedRoute, private router: Router, private service: MealService, private toastController: ToastController, private restaurantService: RestaurantCardService, private updateService: UpdateService) {
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

    this.updateSubscription = this.updateService.newUpdate.subscribe((data) => {
      data ? this.restaurantRated = false : true;
      this.initialize()
    })
  }

  updateRestaurants() {
    FavouritesPage.updateRestaurantsStatic(this.restaurantService)
  }

  ngDoCheck() {
    if (this.inputs !== this.oldInputs) {
      this.roundedStarRating = Math.round(this.inputs.stars * 100) / 100
      document.getElementById("meals")!.innerHTML = '';
      this.mealDivision(this.inputs);

      if (this.inputs.menu != null) {
        for (const meal of this.inputs.menu) {
          if (meal.active == true) {
            if (meal.description) {
              this.service.addDynamicComponent({ id: meal.id, name: meal.title, price: meal.price, type: meal.type, descr: meal.description });
            } else {
              this.service.addDynamicComponent({ id: meal.id, name: meal.title, price: meal.price, type: meal.type });
            }
          }
        }
      }

      //ratings laden
      axios.get(BASE_URL + '/rating/byRestaurant/' + this.inputs.id).then((response) => {
        this.comments = response.data
        this.selectFilter("hilfreich")
        if (response.data.length > 0) {
          for (const comment of response.data) {
            if (comment.user.id == sessionStorage.getItem('userToken')) {
              this.restaurantRated = true;
            }
          }
        } else {
          this.restaurantRated = false;
        }
      })

      this.oldInputs = this.inputs;
      this.filter = "hilfreich"
    }
  }

  async initialize() {
    this.roundedStarRating = Math.round(this.inputs.stars * 100) / 100
    document.getElementById("meals")!.innerHTML = '';
    this.mealDivision(this.inputs);

    if (this.inputs.menu != null) {
      for (const meal of this.inputs.menu) {
        if (meal.active == true) {
          if (meal.description) {
            this.service.addDynamicComponent({ id: meal.id, name: meal.title, price: meal.price, type: meal.type, descr: meal.description });
          } else {
            this.service.addDynamicComponent({ id: meal.id, name: meal.title, price: meal.price, type: meal.type });
          }
        }
      }
    }


    //ratings laden
    axios.get(BASE_URL + '/rating/byRestaurant/' + this.inputs.id).then((response) => {
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
    this.roundedStarRating = await this.getAverageStarts();
  }

  async getAverageStarts() {
    let ratingstars = 0;
    await axios
      .get(BASE_URL + '/rating/byRestaurant/' + this.inputs.id)
      .then((response) => {
        let sumStars = 0;
        if (response.data.length > 0) {
          for (const star of response.data) {
            sumStars += star.stars;
          }
          ratingstars = sumStars / response.data.length;
        }
      });
    return ratingstars;
  }

  mealDivision(inputs: any) {
    let devisionPerMeal = {
      other: 0,
      vegan: 0,
      vegetarian: 0
    }

    if (inputs.menu.length > 0) {
      for (let i = 0; i < inputs.menu.length; i++) {
        if (inputs.menu[i].type == 'other') {
          devisionPerMeal.other++
        }
        else if (inputs.menu[i].type == 'vegetarian') {
          devisionPerMeal.vegetarian++
        }
        else if (inputs.menu[i].type == 'vegan') {
          devisionPerMeal.vegan++
        }
      }

      devisionPerMeal.other = devisionPerMeal.other / inputs.menu.length;
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
      axios.put(BASE_URL + '/user/addFvouriteRestaurant', {
        "restaurant_id": this.inputs.id,
        "user_id": sessionStorage.getItem('userToken')
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
      axios.put(BASE_URL + '/user/removeFvouriteRestaurant', {
        "restaurant_id": this.inputs.id,
        "user_id": sessionStorage.getItem('userToken')
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
      if (this.userStarRating != 0 && this.ratingComment != '') {
        axios.post(BASE_URL + '/rating/create', {
          user: {
            id: sessionStorage.getItem('userToken')
          },
          restaurant: {
            id: this.inputs.id
          },
          stars: this.userStarRating,
          comment: this.ratingComment
        }).then((response) => {
          this.restaurantRated = true;
        })
        this.modal.dismiss(null, 'confirm');
        setTimeout(() => {
          axios.get(BASE_URL + '/rating/byRestaurant/' + this.inputs.id).then((response) => {
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
      } else {
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

  async selectFilter(filterString: string) {
    if (filterString == "hilfreich") {
      this.filter = "hilfreich"
    } else {
      this.filter = "neueste"
    }

    if (this.filter == "hilfreich") {
      let arr: { id: string; upvotes: number; }[] = []
      for (const comment of this.comments) {
        await axios.get(BASE_URL + "/ratingupvotes/getSumVotes/" + comment!.id).then((response) => {
          arr.push({ id: comment!.id, upvotes: response.data })
        })
      }
      arr.sort((a, b) => {
        return b.upvotes - a.upvotes
      })
      let arr1: [{ id: string; comment: string; stars: number; user: { id: number }; date: Date }?] = []
      for (const upvote of arr) {
        for (const comment of this.comments) {
          if (comment!.id == upvote.id) {
            arr1.push(comment)
          }
        }
      }
      this.comments = arr1
    } else if (this.filter == "neueste") {
      this.comments.sort((a, b) => (new Date(b!.date) as any) - (new Date(a!.date) as any));
    }
  }
}
