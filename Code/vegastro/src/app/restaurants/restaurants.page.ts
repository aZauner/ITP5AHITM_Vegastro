import { Component } from '@angular/core';
import { RestaurantCardService } from '../restaurantCard/restaurantCardService';

@Component({
  selector: 'restaurants',
  templateUrl: 'restaurants.page.html',
  styleUrls: ['restaurants.page.scss']
})
export class RestaurantsPage {
  constructor(private service: RestaurantCardService) {
  }
  ngOnInit() {
    this.service.addDynamicComponent({ id: 1, image: "pizzaDemo.png", restaurantName: "Mc Donalds", description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.", type: "meat", stars: Math.floor(Math.random() * 5 + 1) })
    this.service.addDynamicComponent({ id: 1, image: "pizzaDemo.png", restaurantName: "Burger King", description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et ", type: "vegetarian", stars: Math.floor(Math.random() * 5 + 1) })
    this.service.addDynamicComponent({ id: 1, image: "pizzaDemo.png", restaurantName: "Five Guys", description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ", type: "meat", stars: Math.floor(Math.random() * 5 + 1) })
    this.service.addDynamicComponent({ id: 1, image: "pizzaDemo.png", restaurantName: "Mc Donalds", description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.", type: "meat", stars: Math.floor(Math.random() * 5 + 1) })
    this.service.addDynamicComponent({ id: 1, image: "pizzaDemo.png", restaurantName: "Burger King", description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et ", type: "vegetarian", stars: Math.floor(Math.random() * 5 + 1) })
    this.service.addDynamicComponent({ id: 1, image: "pizzaDemo.png", restaurantName: "Five Guys", description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ", type: "meat", stars: Math.floor(Math.random() * 5 + 1) })
    this.service.addDynamicComponent({ id: 1, image: "pizzaDemo.png", restaurantName: "Mc Donalds", description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.", type: "meat", stars: Math.floor(Math.random() * 5 + 1) })
    this.service.addDynamicComponent({ id: 1, image: "pizzaDemo.png", restaurantName: "Burger King", description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et ", type: "vegetarian", stars: Math.floor(Math.random() * 5 + 1) })
    this.service.addDynamicComponent({ id: 1, image: "pizzaDemo.png", restaurantName: "Five Guys", description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ", type: "meat", stars: Math.floor(Math.random() * 5 + 1) })
  }
}
