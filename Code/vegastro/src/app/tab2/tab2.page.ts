import { Component } from '@angular/core';
import { RestaurantCardService } from '../restaurantCard/RestaurantCardService';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  constructor(private service: RestaurantCardService) {
  }
  ngOnInit() {
    this.service.addDynamicComponent({ image: "pizzaDemo.png", restaurantName: "Mc Donalds", description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.", type: "meat", stars: Math.floor(Math.random() * 5 + 1) })
    this.service.addDynamicComponent({ image: "pizzaDemo.png", restaurantName: "Burger King", description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et ", type: "vegetarian", stars: Math.floor(Math.random() * 5 + 1) })
    this.service.addDynamicComponent({ image: "pizzaDemo.png", restaurantName: "Five Guys", description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ", type: "meat", stars: Math.floor(Math.random() * 5 + 1) })
    this.service.addDynamicComponent({ image: "pizzaDemo.png", restaurantName: "Mc Donalds", description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.", type: "meat", stars: Math.floor(Math.random() * 5 + 1) })
    this.service.addDynamicComponent({ image: "pizzaDemo.png", restaurantName: "Burger King", description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et ", type: "vegetarian", stars: Math.floor(Math.random() * 5 + 1) })
    this.service.addDynamicComponent({ image: "pizzaDemo.png", restaurantName: "Five Guys", description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ", type: "meat", stars: Math.floor(Math.random() * 5 + 1) })
    this.service.addDynamicComponent({ image: "pizzaDemo.png", restaurantName: "Mc Donalds", description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.", type: "meat", stars: Math.floor(Math.random() * 5 + 1) })
    this.service.addDynamicComponent({ image: "pizzaDemo.png", restaurantName: "Burger King", description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et ", type: "vegetarian", stars: Math.floor(Math.random() * 5 + 1) })
    this.service.addDynamicComponent({ image: "pizzaDemo.png", restaurantName: "Five Guys", description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ", type: "meat", stars: Math.floor(Math.random() * 5 + 1) })
  }
}
