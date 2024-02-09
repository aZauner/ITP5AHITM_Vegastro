import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import axios from 'axios';
import { BASE_URL } from '../constants';
import {KeycloakService} from "../services/keycloak.service";
@Component({
  selector: 'login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss']
})
export class LoginPage {
  login: FormGroup;
  mailvalid: any;
  foundUser: boolean = true;

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.login = this.formBuilder.group({
      email: ['', Validators.email],
      password: ['', Validators.minLength(2)],
    });
  }

  customCounterFormatter(inputLength: number, maxLength: number) {
    return `${maxLength - inputLength} characters remaining`;
  }

  ngOnInit() {

  }


  checkMailValidation() {
    if (this.login.controls["email"].errors == null) {
      return false;
    }
    return true;
  }

  checkPasswordValidation() {
    if (this.login.controls["password"].errors == null) {
      return false;
    }
    return true;
  }

  executeLogin() {
    let loginData = this.login.value;

    axios.post(BASE_URL+'/user/login', { email: loginData.email, password: loginData.password })
      .then((response) => {
        if (response.data.status != 404) {
          sessionStorage.setItem("userToken", response.data);
          this.foundUser = true;
          this.router.navigate(['/tabs/tab1']);
        } else {
          this.foundUser = false;
        }
      });
  }
}
