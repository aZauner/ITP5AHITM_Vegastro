import { Component } from '@angular/core';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import axios from 'axios';

@Component({
  selector: 'login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss']
})
export class LoginPage { 
  login : FormGroup;

  constructor(private formBuilder: FormBuilder) {    
    this.login = this.formBuilder.group({
      email: ['', Validators.email ],      
      password: ['' , Validators.minLength(2)],
    });   
    
   
    
  }

   
    ngDoCheck(){
      console.log(this.login.controls["email"].errors);
    }
  

  customCounterFormatter(inputLength: number, maxLength: number) {
    return `${maxLength - inputLength} characters remaining`;
  }
  
  ngOnInit() {

  }
 
  executeLogin(){
    let loginData = this.login.value; 
    axios.post('http://localhost:3000/auth/login' , {email: loginData.email , password: loginData.password})
    .then((response) => {
      if (response.data.status != 404) {
        console.log(response.data);        
      }
    });   
  }

}
