import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import axios from 'axios';

@Component({
  selector: 'app-add-meal',
  templateUrl: './add-meal.component.html',
  styleUrls: ['./add-meal.component.scss'],
})
export class AddMealComponent {
  id = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    console.log(this.id);
  }

  formBuilder: FormBuilder = new FormBuilder();

  firstFormGroup = this.formBuilder.group({
    mealName: ['', Validators.minLength(2)],
    description: ['', Validators.minLength(2)],
    type: ['', Validators.minLength(2)],
    price: ['', Validators.minLength(2)],
  });

  hide = true;
  types = ['vegan', 'meat', 'vegetarian'];

  createInputs = {
    title: '',
    description: '',
    type: 'vegan',
    price: '',
  };

  create() {
    this.createInputs.title = this.firstFormGroup.value.mealName!;
    this.createInputs.description = this.firstFormGroup.value.description!;
    this.createInputs.type = this.firstFormGroup.value.type!;
    this.createInputs.price = this.firstFormGroup.value.price!;
    axios
      .post('http://localhost:3000/meal/create', this.createInputs)
      .then( (response) => {
        console.log(response);

        console.log(response.data._id);
        console.log(this.id);       
        
        axios
          .put('http://localhost:3000/restaurant/addMealToMenu', {mealid: response.data._id, restaurantid: this.id})
          .then((response)=> {
            console.log(response);
          });
      });
  }
}
