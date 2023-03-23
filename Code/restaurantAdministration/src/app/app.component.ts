import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from './services/user.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  title = 'restaurantAdministration';

  loggedInSubscription : Subscription; 
  loggedIn = false;

  constructor(private userService: UserService){
    this.loggedInSubscription = this.userService.loggedIn.subscribe((loggedIn)=>{
      this.loggedIn = loggedIn
    })  
  }

}
