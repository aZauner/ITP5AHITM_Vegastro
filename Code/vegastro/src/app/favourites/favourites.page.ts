import { Component } from '@angular/core';
import axios from 'axios';
import { MapPage } from '../map/map.page';
import { RestaurantCardService } from '../restaurantCard/RestaurantCardService';

@Component({
  selector: 'favourites',
  templateUrl: 'favourites.page.html',
  styleUrls: ['favourites.page.scss']
})
export class FavouritesPage {
  constructor(private service: RestaurantCardService) {
  }
  ngOnInit() {
    this.updateRestaurants(this.service);
  }
  
  updateRestaurants = FavouritesPage.updateRestaurantsStatic;

  static updateRestaurantsStatic(service: RestaurantCardService) {
    if (sessionStorage.getItem('userToken') && document.getElementById('favouriteRestaurants')) {
      let restaurantCardList = document.getElementById('favouriteRestaurants')!
      restaurantCardList.innerHTML = '';
      let spinner = document.createElement('ion-spinner');
      spinner.style.height = '5vh'
      spinner.style.width = '5vh'
      spinner.style.margin = '78% 0 0 50%';
      spinner.style.transform = 'translate(-50%,-50%)';
      restaurantCardList.appendChild(spinner)
      axios
        .get(
          'http://localhost:3000/user/favourites/' + sessionStorage.getItem('userToken'))
        .then((response) => {
          if (response.data.status != 404) {          
              restaurantCardList.innerHTML = "<h1 style='font-size: 4vh;margin: 3.5vh 16px 0 16px;text-align: center;'>F A V O R I T E N</h1>"
                for (const restaurant of response.data.favouriteRestaurants) {
                    let desc = restaurant.description ? restaurant.description : "";                                      
                    service.addDynamicComponentFav({ id: restaurant._id, image: restaurant.image ? restaurant.image : null, restaurantName: restaurant.restaurantName, description: desc, type: restaurant.type, stars: restaurant.stars , menu: restaurant.menu, isFav: true , fromFavPage: true })
                  }
          } else {
            restaurantCardList.innerHTML = "<h1 style='margin-top: 75%; text-align: center; font-size: 3vh;'>Keine Favoriten gefunden</h1>"
          }
        });
    } else if (document.getElementById('favouriteRestaurants')) {
      document.getElementById('favouriteRestaurants')!.innerHTML = "<h1 style='margin-top: 75%; text-align: center; font-size: 3vh;'>Nicht Angemeldet</h1>"
    }
  }
}
