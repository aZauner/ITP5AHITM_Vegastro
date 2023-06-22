import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { ActivatedRoute } from '@angular/router';
import axios from 'axios';
import { BASE_URL } from '../components';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {
  hide = true;


  user = 
    {
      firstname: '',
      lastname: '',
      username: '',
      email: '',
      password: '',
    };


  formBuilder: FormBuilder = new FormBuilder();

  firstFormGroup = this.formBuilder.group({
    firstname: ['', Validators.minLength(1)],
    lastname: ['', Validators.minLength(2)],
    username: ['', Validators.minLength(1)],
    email: ['', Validators.minLength(2)],
    password: ['', Validators.minLength(2)],
   
  });

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
  }


      

  
  
  create() {
    this.user.firstname = this.firstFormGroup.value.firstname!;
    this.user.lastname = this.firstFormGroup.value.lastname!;
    this.user.username = this.firstFormGroup.value.username!;
    this.user.email = this.firstFormGroup.value.email!;
    this.user.password = this.firstFormGroup.value.password!;
    console.log(this.user);
    
    axios
      .post(BASE_URL+'/auth/register', this.user)
      .then((response) => {
       console.log(response);
       
      });
  }

 
 

 
}
