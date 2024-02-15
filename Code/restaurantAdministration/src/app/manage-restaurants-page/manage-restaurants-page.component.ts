import { Component } from '@angular/core';
import axios from 'axios';
import { BASE_URL } from '../components';

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
      .get(BASE_URL+'/restaurant/getByOwner/' + sessionStorage.getItem("userToken"), {headers: {
      'Authorization': `Basic ${sessionStorage.getItem("userJwtToken")}`
    }})
      .then( (response) => {
        console.log(response);
        this.restaurants = response.data
      });
  }
}
