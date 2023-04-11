import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} 
from '@angular/forms';
import axios from 'axios';

@Component({
  selector: 'app-add-meal',
  templateUrl: './add-meal.component.html',
  styleUrls: ['./add-meal.component.scss']
})
export class AddMealComponent {
  id = ""


  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(){
    this.id = this.route.snapshot.params['id'];
    console.log(this.id) 
  }

  formBuilder: FormBuilder = new FormBuilder

  firstFormGroup = this.formBuilder.group({
    mealName: ['', Validators.minLength(2)],
    description: ['', Validators.minLength(2)],
    type: ['', Validators.minLength(2)],
    price: ['', Validators.minLength(2)],
  });
  

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

  create(){
    console.log("test");    
  }
}
