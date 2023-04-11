import { Component } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-manage-restaurants-page',
  templateUrl: './manage-restaurants-page.component.html',
  styleUrls: ['./manage-restaurants-page.component.scss']
})
export class ManageRestaurantsPageComponent {

  restaurants = [{id: 0, restaurantName: "" , location: {city : "" , street: "", housenumber: 0}}] 

  ngOnInit(){
    this.getUsersRestaurants()
    // setInterval( ()=>{
    //   console.log(this.restaurants)}, 1000);
    // ;    
  }

  getUsersRestaurants() {
    axios
      .get('http://localhost:3000/restaurant/getByOwner/' + sessionStorage.getItem("userToken"))
      .then( (response) => {
        console.log(response);
        this.restaurants = response.data
      });
  }
}
