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
  location = { street: '', housenumber: '', plz: '', city: '' };
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
    });
  }

  create() {
    this.createInputs.location.city = this.location.city;
    this.createInputs.location.housenumber = this.location.housenumber;
    this.createInputs.location.plz = this.location.plz;
    this.createInputs.location.street = this.location.street;
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
      .post(
        'https://nominatim.openstreetmap.org/search?format=json&limit=3&q=' +
          address
      )
      .then((response) => {
        console.log(response.data);
        if (response.data.length > 0) {          
          this.createInputs.latitude = response.data[0].lat;
          this.createInputs.longitude = response.data[0].lon;
          console.log(this.createInputs);          
        } else {
          console.log('Geht ned');
        }
      });    
  }
}
