import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RestaurantsRegistrationPage } from './restaurantRegistration.page';

const routes: Routes = [
  {
    path: '',
    component: RestaurantsRegistrationPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RestaurantsRegistrationRoutingModule {}
