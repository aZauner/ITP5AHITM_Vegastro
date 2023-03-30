import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import axios from 'axios';

@Component({
  selector: 'app-create-restaurant-page',
  templateUrl: './create-restaurant-page.component.html',
  styleUrls: ['./create-restaurant-page.component.scss'],
})
export class CreateRestaurantPageComponent {
  createRestaurant: FormGroup;
  hide = true;
  types = ['vegan', 'meat', 'vegetarian'];
  location = { street: '', housenumber: '', plz: '', city: '', floor: '' };
  createInputs = {
    restaurantName: '',
    latitude: 0,
    longitude: 0,
    owner: '',
    type: '',
    description: '',
    location: { city: '', plz: '', street: '', housenumber: '', floor: '' },
  };

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {
    this.createRestaurant = this.formBuilder.group({
      restaurantName: ['', Validators.minLength(2)],
      description: ['', Validators.minLength(2)],
      city: ['', Validators.minLength(2)],
      plz: ['', Validators.minLength(2)],
      floor: ['', Validators.minLength(2)],
      street: ['', Validators.minLength(2)],
      housenumber: ['', Validators.minLength(2)],
      type: ['']
    });
  }

  create() {
    this.location.city = this.createRestaurant.value.city
    this.location.housenumber = this.createRestaurant.value.housenumber
    this.location.plz = this.createRestaurant.value.plz
    this.location.street = this.createRestaurant.value.street 
    this.createInputs.location= this.location;
    this.createInputs.location.floor = this.createRestaurant.value.floor
    this.createInputs.description = this.createRestaurant.value.description
    this.createInputs.restaurantName = this.createRestaurant.value.restaurantName
    this.createInputs.type = this.createRestaurant.value.type
   
    this.createInputs.owner = sessionStorage.getItem("userToken")!;
    this.addrSearch(
      this.location.street +
        ' ' +
        this.location.housenumber +
        ' ' +
        this.location.plz +
        ' ' +
        this.location.city
    );
  }

  addrSearch(address: string) {
    axios
      .get(
        'https://nominatim.openstreetmap.org/search?format=json&limit=3&q=' +
          address
      )
      .then((response) => {      
        if (response.data.length > 0) {          
          this.createInputs.latitude = Number.parseFloat(response.data[0].lat) ;
          this.createInputs.longitude =  Number.parseFloat(response.data[0].lon);
          this.postRestaurant()
        } else {
          console.log('Geht ned');
        }
      });    
  }

  postRestaurant(){

  }
}
