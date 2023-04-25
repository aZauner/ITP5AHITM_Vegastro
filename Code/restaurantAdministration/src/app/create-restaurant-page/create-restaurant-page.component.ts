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
  formBuilder: FormBuilder = new FormBuilder

  firstFormGroup = this.formBuilder.group({
    restaurantName: ['', Validators.minLength(2)],
    description: ['', Validators.minLength(2)],
    type: ['', Validators.minLength(2)],
  });
  secondFormGroup = this.formBuilder.group({
    city: ['', Validators.minLength(2)],
    plz: ['', Validators.minLength(2)],
    floor: ['', Validators.minLength(2)],
    street: ['', Validators.minLength(2)],
    housenumber: [''],
  });
  isLinear = true;

  hide = true;
  types = ['Vegan', 'Fleisch', 'Vegetarisch'];
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
 

  create() {
    this.location.city = this.secondFormGroup.value.city!;
    this.location.housenumber = this.secondFormGroup.value.housenumber!;
    this.location.plz = this.secondFormGroup.value.plz!;
    this.location.street = this.secondFormGroup.value.street!;
    this.createInputs.location = this.location;
    this.createInputs.location.floor = this.secondFormGroup.value.floor!;

    this.createInputs.description = this.firstFormGroup.value.description!;
    this.createInputs.restaurantName =  this.firstFormGroup.value.restaurantName!;
    this.createInputs.type = this.firstFormGroup.value.type!;

    this.createInputs.owner = sessionStorage.getItem('userToken')!;
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
          this.createInputs.latitude = Number.parseFloat(response.data[0].lat);
          this.createInputs.longitude = Number.parseFloat(response.data[0].lon);
          this.postRestaurant();
        } else {
          console.log('Geht ned');
        }
      });
  }

  postRestaurant() {
    axios
      .post('http://localhost:3000/restaurant/create', this.createInputs)
      .then(function (response) {
        console.log(response);
      });
  }
}
