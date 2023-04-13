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
  createMealActive = false;
  showMealsActive = false;

  meals = [
    {
      _id: '',
      description: '',
      price: '',
      title: '',
      type: '',
      active: true,
    },
  ];

  editValues = [{ mealId: '', editable: false }];

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    // console.log(this.id);
    this.loadMeals();
  }

  editMeal(mealIndex: number) {
    console.log(mealIndex);
    this.editValues[mealIndex].editable = !this.editValues[mealIndex].editable;
  }

  loadMeals() {
    this.meals = [];
    this.editValues = [];
    axios
      .get('http://localhost:3000/restaurant/' + this.id)
      .then((response) => {
        // console.log(response);
        if (response.data.menu.length > 0) {
          for (const meal of response.data.menu) {
            this.meals.push(meal);
            this.editValues.push({ mealId: meal._id, editable: false });
            // console.log(this.editValues);
          }
        }
      });
  }

  formBuilder: FormBuilder = new FormBuilder();

  firstFormGroup = this.formBuilder.group({
    mealName: ['', Validators.minLength(1)],
    description: ['', Validators.minLength(2)],
    type: ['', Validators.minLength(2)],
    price: [
      '',
      Validators.pattern(
        /^(?:-(?:[1-9](?:\d{0,2}(?:,\d{3})+|\d*))|(?:0|(?:[1-9](?:\d{0,2}(?:,\d{3})+|\d*))))(?:.\d+|)$/
      ),
    ],
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
      .then((response) => {
        axios
          .put('http://localhost:3000/restaurant/addMealToMenu', {
            mealid: response.data._id,
            restaurantid: this.id,
          })
          .then((response) => {
            // console.log(response);
            this.loadMeals();
          });
      });
  }

  showCreate() {
    this.createMealActive = !this.createMealActive;
  }

  showMeals() {
    this.showMealsActive = !this.showMealsActive;
  }

  toggleActive(indexToChange: number) {
    console.log(indexToChange);
    
    console.log(this.meals[indexToChange]._id);    
    axios
      .put('http://localhost:3000/meal/changeActiveStatus', {
        mealid: this.meals[indexToChange]._id,
      })
      .then((response) => {        
        this.loadMeals();
      });
  }
}
