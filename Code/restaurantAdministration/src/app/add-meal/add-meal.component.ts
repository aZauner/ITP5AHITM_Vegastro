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
  showRatingsActive = false;

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

  ratings = [
    {
      stars: 0,
      comment: ""
    }
  ]

  roundedStarRating=0

  editValues = [{ mealId: '', editable: false }];

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    // console.log(this.id);
    this.loadMeals();
    this.loadRatings();
  }

  submitChanges( index: number,value: string , desc: string, price: string) {
    console.log(this.meals[index]._id);    
    console.log(value);
    console.log(desc);
    console.log(price);
      

    axios
      .put('http://localhost:3000/meal/changeMealValues' , {
        mealId: this.meals[index]._id,
        title : value,
        description : desc,
        type: this.meals[index].type,
        price: price 
    })
      .then((response) => {
        console.log("changed");
        this.loadMeals();       
      });
    
  }

  editMeal(mealIndex: number) {    
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

  loadRatings() {
    this.ratings = [];    
    axios.get('http://localhost:3000/rating/byRestaurant/' + this.id).then((response) => {
            this.ratings = response.data
            let sumStars = 0;
            if (response.data.length > 0) {
              for (const star of response.data) {
                sumStars += star.stars;
              }
              this.roundedStarRating = Math.round((sumStars / response.data.length) * 100) / 100
            }
            console.log(this.ratings);
            console.log(this.roundedStarRating);  
          })
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
      this.loadMeals();
  }

  showCreate() {
    this.createMealActive = !this.createMealActive;
    this.showMealsActive = false;
    this.showRatingsActive = false;
  }

  showMeals() {
    this.showMealsActive = !this.showMealsActive;
    this.createMealActive = false;
    this.showRatingsActive = false;
  }

  showRatingsBox(){
    this.showRatingsActive = !this.showRatingsActive;
    this.showMealsActive = false;
    this.createMealActive = false
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

  deleteMeal(id: string){
    console.log(id);
    axios
      .delete('http://localhost:3000/meal/deleteMeal/' + id)
      .then((response) => {        
        this.loadMeals();
      });
  }
}
