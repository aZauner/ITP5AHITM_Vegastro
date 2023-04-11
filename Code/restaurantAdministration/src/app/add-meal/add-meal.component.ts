import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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
}
