import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginPageComponent } from './login-page/login-page.component';
import {RouterModule, RouterOutlet, Routes} from "@angular/router";
import { DashboardComponent } from './dashboard/dashboard.component';
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AuthGuardService} from "./services/authGuard.service";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import { CreateRestaurantPageComponent } from './create-restaurant-page/create-restaurant-page.component';
import {MatStepperModule} from '@angular/material/stepper';
import { NavComponent } from './nav/nav.component';
import { ManageRestaurantsPageComponent } from './manage-restaurants-page/manage-restaurants-page.component';

const appRoutes: Routes = [
  {path: '', component: DashboardComponent, canActivate: [AuthGuardService]},
  {path: 'dashboard' , component: DashboardComponent, canActivate: [AuthGuardService]},
  {path: 'login' , component: LoginPageComponent},
  {path: 'createRestaurant' , component: CreateRestaurantPageComponent},
  {path: 'manageRestaurants' , component: ManageRestaurantsPageComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    DashboardComponent,
    CreateRestaurantPageComponent,
    NavComponent,
    ManageRestaurantsPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    RouterOutlet,
    RouterModule.forRoot(appRoutes),
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    MatStepperModule
  ],
  providers: [AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
