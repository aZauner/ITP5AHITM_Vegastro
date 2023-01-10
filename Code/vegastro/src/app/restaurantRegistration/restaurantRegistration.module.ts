import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RestaurantsRegistrationPage } from './restaurantRegistration.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { RestaurantsRegistrationRoutingModule } from './restaurantRegistration-routing.module';
import { RestaurantCardModule } from '../restaurantCard/restaurantCard.module';
import { RestaurantCardService } from '../restaurantCard/RestaurantCardService';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    RestaurantsRegistrationRoutingModule,
  ],
  declarations: [RestaurantsRegistrationPage]
})

export class RestaurantsRegistrationModule {

}
