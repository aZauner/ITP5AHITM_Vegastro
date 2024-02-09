import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import axios from 'axios';
import { BASE_URL } from '../constants';
import {KeycloakService} from "../services/keycloak.service";

@Component({
  selector: 'registration',
  templateUrl: 'registration.page.html',
  styleUrls: ['registration.page.scss']
})
export class RegistrationPage {
  registration: FormGroup;
  mailvalid: any;
  mailUsed: boolean = true;

  constructor(private formBuilder: FormBuilder, private router: Router, private keycloakService:KeycloakService) {
    this.registration = this.formBuilder.group({
      firstName: ['', Validators.minLength(1)],
      lastName: ['', Validators.minLength(1)],
      username: ['', Validators.minLength(1)],
      email: ['', Validators.email],
      password: ['', Validators.minLength(1)]
    });
  }

  customCounterFormatter(inputLength: number, maxLength: number) {
    return `${maxLength - inputLength} characters remaining`;
  }

  ngOnInit() {

  }


  checkFirstNameValidation() {
    if (this.registration.controls["firstName"].errors == null) {
      return false;
    }
    return true;
  }

  checkUsernameValidation() {
    if (this.registration.controls["username"].errors == null) {
      return false;
    }
    return true;
  }

  checkPasswordValidation() {
    if (this.registration.controls["password"].errors == null) {
      return false;
    }
    return true;
  }

  checkMailValidation() {
    if (this.registration.controls["email"].errors == null) {
      return false;
    }
    return true;
  }

  checkLastNameValidation() {
    if (this.registration.controls["lastName"].errors == null) {
      return false;
    }
    return true;
  }

  executeLogin() {
    let registrationData = this.registration.value;

    this.keycloakService.getAccessToken().subscribe((data: any) =>{
      let accessToken = data.access_token;
      console.log(accessToken)
      this.keycloakService.createUser(accessToken, registrationData.username, registrationData.email, registrationData.firstName, registrationData.lastName, registrationData.password).subscribe((data) =>{
        console.log(data)
        // this.keycloakService.getUserToken("testuser2", "testpassword", accessToken).subscribe((data)=>{
        //   console.log(data)
        // })
      })

    })


    axios.post(BASE_URL+'/user/register', { firstname: registrationData.firstName,
      lastname: registrationData.lastName,
      username: registrationData.username,
      email: registrationData.email,
      password: registrationData.password })
      .then((response) => {
        if (response.data.status != 404) {
          this.mailUsed = true;
          this.router.navigate(['login']);
        } else {
          this.mailUsed = false;
        }
      });
  }

}
