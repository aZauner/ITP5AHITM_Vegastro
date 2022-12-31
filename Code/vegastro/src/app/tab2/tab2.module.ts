import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab2Page } from './tab2.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { Tab2PageRoutingModule } from './tab2-routing.module';
import { RestaurantCardModule } from '../restaurantCard/restaurantCard.module';
import { RestaurantCardService } from '../restaurantCard/RestaurantCardService';
import { RestaurantCard } from '../restaurantCard/restaurantCard.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab2PageRoutingModule,
    RestaurantCardModule
  ],
  declarations: [
    Tab2Page
  ],
  providers: [RestaurantCardService],
  entryComponents: [RestaurantCard]
})
export class Tab2PageModule {

}
