import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RestaurantCardDetail } from './restaurantCardDetail.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { IonRatingStarsModule } from 'ion-rating-stars';
import { RestaurantCardDetailRoutingModule } from './restaurantCardDetail-routing.module';
import { MealModule } from '../meal/meal.module';
import { MealService } from '../meal/mealService';
import { Meal } from '../meal/meal.component';

@NgModule({
  imports: [
    IonRatingStarsModule,
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    RestaurantCardDetailRoutingModule,
    MealModule
  ],
  declarations: [RestaurantCardDetail],
  providers: [MealService],
  entryComponents: [Meal]
})

export class RestaurantCardDetailModule {

}
