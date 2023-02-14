import { Component } from '@angular/core';
import axios from 'axios';
import { MapPage } from '../map/map.page';
import { RestaurantCardService } from '../restaurantCard/RestaurantCardService';

@Component({
  selector: 'restaurants',
  templateUrl: 'restaurants.page.html',
  styleUrls: ['restaurants.page.scss']
})
export class RestaurantsPage {
  constructor(private service: RestaurantCardService) {
  }
  ngOnInit() {
    this.updateRestaurants();
    const intervalInit = setInterval((() => {
      try {
        const hitBtn = document.getElementById('hitBtn');
        hitBtn!.addEventListener('click', () => {
          this.updateRestaurants();
        })
        clearInterval(intervalInit)
      } catch { }
    }), 50)
  }

  updateRestaurants() {
    if (MapPage.map) {
      const bounds = MapPage.map.getBounds();
      let restaurantCardList = document.getElementById('restaurantCards')
      restaurantCardList!.innerHTML = '';
      axios
        .get(
          'http://localhost:3000/restaurant/getNearPosition/' +
          bounds.getNorthEast().lat +
          '/' +
          bounds.getNorthEast().lng +
          '/' +
          bounds.getSouthWest().lat +
          '/' +
          bounds.getSouthWest().lng
        )
        .then((response) => {

          if (response.data.status != 404) {
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
                    this.service.addDynamicComponent({ id: restaurant.id, image: "pizzaDemo.png", restaurantName: restaurant.restaurantName, description: desc, type: "meat", stars: Math.floor(Math.random() * 5 + 1), menu: restaurant.menu, isFav: favRests.includes(restaurant.id) })
                  }
                }
                if (count == 0 && document.getElementById('restaurantCards')) {
                  document.getElementById('restaurantCards')!.innerHTML = "";
                  document.getElementById('restaurantCards')!.innerHTML = "<h1 style='margin-top: 75%; text-align: center; font-size: 3vh;'>Keine Treffer gefunden</h1>"
                }
              } else {
                for (const restaurant of response.data) {
                  let desc = restaurant.description ? restaurant.description : "";
                  this.service.addDynamicComponent({ id: restaurant.id, image: "pizzaDemo.png", restaurantName: restaurant.restaurantName, description: desc, type: "meat", stars: Math.floor(Math.random() * 5 + 1), menu: restaurant.menu, isFav: favRests.includes(restaurant.id) })
                }
              }
            } else {
              if (MapPage.filters.length > 0) {
                let count = 0;
                for (const restaurant of response.data) {
                  if (MapPage.filters.includes(restaurant.type)) {
                    count++
                    let desc = restaurant.description ? restaurant.description : "";
                    this.service.addDynamicComponent({ id: restaurant.id, image: "pizzaDemo.png", restaurantName: restaurant.restaurantName, description: desc, type: "meat", stars: Math.floor(Math.random() * 5 + 1), menu: restaurant.menu, isFav: false })
                  }
                }
                if (count == 0 && document.getElementById('restaurantCards')) {
                  document.getElementById('restaurantCards')!.innerHTML = "";
                  document.getElementById('restaurantCards')!.innerHTML = "<h1 style='margin-top: 75%; text-align: center; font-size: 3vh;'>Keine Treffer gefunden</h1>"
                }
              } else {
                for (const restaurant of response.data) {
                  let desc = restaurant.description ? restaurant.description : "";
                  this.service.addDynamicComponent({ id: restaurant.id, image: "pizzaDemo.png", restaurantName: restaurant.restaurantName, description: desc, type: "meat", stars: Math.floor(Math.random() * 5 + 1), menu: restaurant.menu, isFav: false })
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
