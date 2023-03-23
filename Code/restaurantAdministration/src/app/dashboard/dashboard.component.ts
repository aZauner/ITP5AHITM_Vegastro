import { Component } from '@angular/core';
import { AppComponent } from '../app.component';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  constructor(private userService: UserService){
  }

  ngOnInit(){
    this.userService.logIn();
  }

}
