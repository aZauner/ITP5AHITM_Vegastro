import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        loadChildren: () => import('../map/map.module').then(m => m.MapPageModule)
      },
      {
        path: 'tab2',
        loadChildren: () => import('../restaurants/restaurants.module').then(m => m.RestaurantsModule)
      },
      {
        path: 'restaurantDetail',
        loadChildren: () => import('../restaurantCardDetail/restaurantCardDetail.module').then(m => m.RestaurantCardDetailModule)
      },  
      {    
        path: 'restaurantRegistration',
        redirectTo: '/restaurantRegistration',
        pathMatch: 'full'
      },    
      {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full'
      }
    ]
  },
  {    
    path: 'restaurantRegistration',
    loadChildren: () => import('../restaurantRegistration/restaurantRegistration.module').then(m => m.RestaurantsRegistrationModule)    
  },
  {
    path: '',
    redirectTo: '/tabs/tab1',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
