import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  title = 'restaurantAdministration';

  constructor(public router: Router) {}

  loggedIn = false

  ngOnInit(){
    if(sessionStorage.getItem("userToken") != undefined){
      this.loggedIn = true
    }else{
      this.loggedIn = false

    }
  }

}
