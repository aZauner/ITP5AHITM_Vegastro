import { Component } from '@angular/core';
import { Subscription } from 'rxjs';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  title = 'restaurantAdministration';

  loggedIn = false

  ngOnInit(){
    if(sessionStorage.getItem("userToken") != undefined){
      this.loggedIn = true
    }else{
      this.loggedIn = false

    }
  }

}
