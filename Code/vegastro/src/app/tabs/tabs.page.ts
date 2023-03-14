import { Component } from '@angular/core';
import { FavouritesPage } from '../favourites/favourites.page';
import { MapPage } from '../map/map.page';
import { RestaurantCardService } from '../restaurantCard/RestaurantCardService';
import { RestaurantsPage } from '../restaurants/restaurants.page';
import { IonModal, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  loggedIn = false;

  constructor(private service: RestaurantCardService,  private toastController: ToastController) {}
  
  update() {
    MapPage.getFavRests();
    RestaurantsPage.updateRestaurantsStatic(this.service);
    FavouritesPage.updateRestaurantsStatic(this.service);
    if(sessionStorage.getItem('userToken')){
      this.loggedIn = true
    }else{
      this.loggedIn = false
    }
         
  }

  logout(){
    sessionStorage.clear() 
    this.callToast(1300)   
  }

  async callToast(duration: number) {
    const toast = await this.toastController.create({
      message: 'Sie sind abgemeldet',
      duration: duration,
      position: 'middle',      
      cssClass: 'LoggedOutToast'      
    });
    await toast.present();
  }


}
