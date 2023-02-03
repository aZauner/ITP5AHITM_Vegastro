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

    setInterval(() => {
      this.updateRestaurants();
    }, 1000);
    
    // this.service.addDynamicComponent({ id: 1, image: "pizzaDemo.png", restaurantName: "Mc Donalds", description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.", type: "meat", stars: Math.floor(Math.random() * 5 + 1) })
    // this.service.addDynamicComponent({ id: 1, image: "pizzaDemo.png", restaurantName: "Burger King", description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et ", type: "vegetarian", stars: Math.floor(Math.random() * 5 + 1) })
    // this.service.addDynamicComponent({ id: 1, image: "pizzaDemo.png", restaurantName: "Five Guys", description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ", type: "meat", stars: Math.floor(Math.random() * 5 + 1) })
    // this.service.addDynamicComponent({ id: 1, image: "pizzaDemo.png", restaurantName: "Mc Donalds", description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.", type: "meat", stars: Math.floor(Math.random() * 5 + 1) })
    // this.service.addDynamicComponent({ id: 1, image: "pizzaDemo.png", restaurantName: "Burger King", description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et ", type: "vegetarian", stars: Math.floor(Math.random() * 5 + 1) })
    // this.service.addDynamicComponent({ id: 1, image: "pizzaDemo.png", restaurantName: "Five Guys", description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ", type: "meat", stars: Math.floor(Math.random() * 5 + 1) })
    // this.service.addDynamicComponent({ id: 1, image: "pizzaDemo.png", restaurantName: "Mc Donalds", description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.", type: "meat", stars: Math.floor(Math.random() * 5 + 1) })
    // this.service.addDynamicComponent({ id: 1, image: "pizzaDemo.png", restaurantName: "Burger King", description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et ", type: "vegetarian", stars: Math.floor(Math.random() * 5 + 1) })
    // this.service.addDynamicComponent({ id: 1, image: "pizzaDemo.png", restaurantName: "Five Guys", description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ", type: "meat", stars: Math.floor(Math.random() * 5 + 1) })
  }

  updateRestaurants() {
    const bounds = MapPage.map.getBounds();
    if (
      bounds.getNorthEast().lat != this.currentNorthEastLat ||
      bounds.getNorthEast().lng != this.currentNorthEastLon ||
      bounds.getSouthWest().lat != this.currentSouthWestLat ||
      bounds.getSouthWest().lng != this.currentSouthWestLon
    ) {
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
          console.log(response);

          if (response.data.status != 404) {
            let restaurantCardList = document.getElementById('restaurantCards')
            restaurantCardList!.innerHTML = '';
            for (const restaurant of response.data) {              
              this.service.addDynamicComponent({ id: restaurant.id, image: "pizzaDemo.png", restaurantName: restaurant.restaurantName , description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ", type: "meat", stars: Math.floor(Math.random() * 5 + 1) })              
            } 
          }
        });
    }
  }
}
