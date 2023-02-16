import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegistrationPage } from './registration.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { RegistrationRoutingModule } from './registration-routing.module';
import { RestaurantCardModule } from '../restaurantCard/restaurantCard.module';
import { RestaurantCardService } from '../restaurantCard/RestaurantCardService';



@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    RegistrationRoutingModule,
    ReactiveFormsModule 
  ],
  declarations: [RegistrationPage]
})

export class RegistrationModule {

}
