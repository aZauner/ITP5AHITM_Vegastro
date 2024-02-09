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
        this.keycloakService.getUserToken(registrationData.email, registrationData.password, accessToken).subscribe((data:any)=>{
          let jwtToken = data.access_token

          var base64Url = jwtToken.split('.')[1];
          var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
          var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
          }).join(''));

          jwtToken = JSON.parse(jsonPayload) ;

          this.keycloakService.getRole("default_role", accessToken).subscribe((data)=>{
            let roledata = data;

            this.keycloakService.mapRole(roledata, jwtToken.sub, accessToken).subscribe()
          })
        })
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
