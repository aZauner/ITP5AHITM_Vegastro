import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TabsPageRoutingModule } from './tabs-routing.module';

import { TabsPage } from './tabs.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { RestaurantCardService } from '../restaurantCard/RestaurantCardService';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabsPageRoutingModule,
    ExploreContainerComponentModule
  ],
  providers: [RestaurantCardService],
  declarations: [TabsPage]
})
export class TabsPageModule {}
