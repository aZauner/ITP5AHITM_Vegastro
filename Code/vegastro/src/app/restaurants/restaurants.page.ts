import { Component } from '@angular/core';
import axios from 'axios';
import { MapPage } from '../map/map.page';
import { RestaurantCardService } from '../restaurantCard/RestaurantCardService';
import { BASE_URL } from '../constants';

@Component({
  selector: 'restaurants',
  templateUrl: 'restaurants.page.html',
  styleUrls: ['restaurants.page.scss']
})
export class RestaurantsPage {
  check: boolean = true;
  constructor(private service: RestaurantCardService) {
  }
  ngOnInit() {
    this.updateRestaurants(this.service);
    const intervalInit = setInterval((() => {
      try {
        const hitBtn = document.getElementById('hitBtn');
        hitBtn!.addEventListener('click', () => {
          this.updateRestaurants(this.service);
        })
        clearInterval(intervalInit)
      } catch { }
    }), 50)
  }

  updateRestaurants = RestaurantsPage.updateRestaurantsStatic;

  static updateRestaurantsStatic(service: RestaurantCardService) {
    if (MapPage.map && document.getElementById('restaurantCards')) {

      const bounds = MapPage.map.getBounds();
      let restaurantCardList = document.getElementById('restaurantCards')!
      restaurantCardList.innerHTML = '';
      let spinner = document.createElement('ion-spinner');
      spinner.style.height = '5vh'
      spinner.style.width = '5vh'
      spinner.style.margin = '78% 0 0 50%';
      spinner.style.transform = 'translate(-50%,-50%)';
      restaurantCardList.appendChild(spinner)
      axios
        .get(
          BASE_URL + '/restaurant/getNearPosition/' +
          bounds.getNorthEast().lat +
          '/' +
          bounds.getNorthEast().lng +
          '/' +
          bounds.getSouthWest().lat +
          '/' +
          bounds.getSouthWest().lng
        )
        .then((response) => {
          if (response.data.length > 0) {
            if (document.getElementById('restaurantCards')) {
              document.getElementById('restaurantCards')!.innerHTML = "<h1 style='font-size: 4vh;margin: 3.5vh 16px 0 16px;text-align: center;'>T R E F F E R</h1>"
            }
            if (sessionStorage.getItem('favouriteRestaurants')) {
              let favRests: [string] = JSON.parse(sessionStorage.getItem('favouriteRestaurants')!);
              if (MapPage.filters.length > 0) {
                let count = 0;
                for (const restaurant of response.data) {
                  if (MapPage.filters.includes(restaurant.type)) {
                    count++;
                    let desc = restaurant.description ? restaurant.description : "";
                    service.addDynamicComponent({ id: restaurant.id, image: restaurant.image ? restaurant.image.id : null, restaurantName: restaurant.restaurantName, description: desc, type: restaurant.type, stars: Math.floor(Math.random() * 5 + 1), menu: restaurant.menu, isFav: favRests.includes(restaurant.id) })
                  }
                }
                if (count == 0 && document.getElementById('restaurantCards')) {
                  document.getElementById('restaurantCards')!.innerHTML = "";
                  document.getElementById('restaurantCards')!.innerHTML = "<h1 style='margin-top: 75%; text-align: center; font-size: 3vh;'>Keine Treffer gefunden</h1>"
                }
              } else {
                for (const restaurant of response.data) {
                  let desc = restaurant.description ? restaurant.description : "";
                  service.addDynamicComponent({ id: restaurant.id, image: restaurant.image ? restaurant.image.id : null, restaurantName: restaurant.restaurantName, description: desc, type: restaurant.type, stars: Math.floor(Math.random() * 5 + 1), menu: restaurant.menu, isFav: favRests.includes(restaurant.id) })
                }
              }
            } else {
              if (MapPage.filters.length > 0) {
                let count = 0;
                for (const restaurant of response.data) {
                  if (MapPage.filters.includes(restaurant.type)) {
                    count++
                    let desc = restaurant.description ? restaurant.description : "";
                    service.addDynamicComponent({ id: restaurant.id, image: restaurant.image ? restaurant.image.id : null, restaurantName: restaurant.restaurantName, description: desc, type: restaurant.type, stars: Math.floor(Math.random() * 5 + 1), menu: restaurant.menu, isFav: false })
                  }
                }
                if (count == 0 && document.getElementById('restaurantCards')) {
                  document.getElementById('restaurantCards')!.innerHTML = "";
                  document.getElementById('restaurantCards')!.innerHTML = "<h1 style='margin-top: 75%; text-align: center; font-size: 3vh;'>Keine Treffer gefunden</h1>"
                }
              } else {
                for (const restaurant of response.data) {
                  let desc = restaurant.description ? restaurant.description : "";
                  service.addDynamicComponent({ id: restaurant.id, image: restaurant.image ? restaurant.image.id : null, restaurantName: restaurant.restaurantName, description: desc, type: restaurant.type, stars: Math.floor(Math.random() * 5 + 1), menu: restaurant.menu, isFav: false })
                }
              }
            }
          } else if (document.getElementById('restaurantCards')) {
            document.getElementById('restaurantCards')!.innerHTML = "<h1 style='margin-top: 75%; text-align: center; font-size: 3vh;'>Keine Treffer gefunden</h1>"
          }
        });
    }
  }
}


