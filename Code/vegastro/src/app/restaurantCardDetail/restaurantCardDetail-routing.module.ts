import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RestaurantCardDetail } from './restaurantCardDetail.page';

const routes: Routes = [
  {
    path: '',
    component: RestaurantCardDetail,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RestaurantCardDetailRoutingModule {}
