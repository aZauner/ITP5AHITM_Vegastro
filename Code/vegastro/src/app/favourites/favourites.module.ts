import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FavouritesPage } from './favourites.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { FavouritesRoutingModule } from './favourites-routing.module';
import { RestaurantCardModule } from '../restaurantCard/restaurantCard.module';
import { RestaurantCardService } from '../restaurantCard/RestaurantCardService';
import { RestaurantCard } from '../restaurantCard/restaurantCard.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    FavouritesRoutingModule,
    RestaurantCardModule
  ],
  declarations: [FavouritesPage],
  providers: [RestaurantCardService],
  entryComponents: [RestaurantCard]
})

export class FavouritesModule {

}
