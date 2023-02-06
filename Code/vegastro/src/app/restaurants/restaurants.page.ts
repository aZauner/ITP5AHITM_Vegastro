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
  currentNorthEastLat: number = 0;
  currentNorthEastLon: number = 0;
  currentSouthWestLat: number = 0;
  currentSouthWestLon: number = 0;
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
      } catch {}
    }), 50)
  }

  updateRestaurants() {
    const bounds = MapPage.map.getBounds();
    if (
      bounds.getNorthEast().lat != this.currentNorthEastLat ||
      bounds.getNorthEast().lng != this.currentNorthEastLon ||
      bounds.getSouthWest().lat != this.currentSouthWestLat ||
      bounds.getSouthWest().lng != this.currentSouthWestLon
    ) {
      let restaurantCardList = document.getElementById('restaurantCards')
          restaurantCardList!.innerHTML = '';
      this.currentNorthEastLat = bounds.getNorthEast().lat;
      this.currentNorthEastLon = bounds.getNorthEast().lng;
      this.currentSouthWestLat = bounds.getSouthWest().lat;
      this.currentSouthWestLon = bounds.getSouthWest().lng;
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
            for (const restaurant of response.data) {
              let desc = restaurant.description ? restaurant.description : "";
              this.service.addDynamicComponent({ id: restaurant.id, image: "pizzaDemo.png", restaurantName: restaurant.restaurantName, description: desc, type: "meat", stars: Math.floor(Math.random() * 5 + 1), menu: restaurant.menu })
            }
          }
        });
    }
  }
}
