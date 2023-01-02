import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RestaurantsPage } from './restaurants.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { RestaurantsRoutingModule } from './restaurants-routing.module';
import { RestaurantCardModule } from '../restaurantCard/restaurantCard.module';
import { RestaurantCardService } from '../restaurantCard/restaurantCardService';
import { RestaurantCard } from '../restaurantCard/restaurantCard.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    RestaurantsRoutingModule,
    RestaurantCardModule
  ],
  declarations: [RestaurantsPage],
  providers: [RestaurantCardService],
  entryComponents: [RestaurantCard]
})

export class RestaurantsModule {

}
