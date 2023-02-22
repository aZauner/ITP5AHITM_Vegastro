import { Component } from '@angular/core';
import { FavouritesPage } from '../favourites/favourites.page';
import { MapPage } from '../map/map.page';
import { RestaurantCardService } from '../restaurantCard/RestaurantCardService';
import { RestaurantsPage } from '../restaurants/restaurants.page';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(private service: RestaurantCardService) {}

  update() {
    MapPage.getFavRests();
    RestaurantsPage.updateRestaurantsStatic(this.service);
    FavouritesPage.updateRestaurantsStatic(this.service);
  }
}
