import { Component } from '@angular/core';
import {UserService} from "../services/user.service";
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {KeycloakService} from "../services/keycloak.service";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
  login: FormGroup
  password = "";
  mail = "";
  email = new FormControl('', [Validators.required, Validators.email]);
  hide = true;

  constructor(private formBuilder: FormBuilder,private userService: UserService, private keycloakService :KeycloakService) {
    this.login = this.formBuilder.group({
      mail: ['', Validators.email],
      password: ['', Validators.minLength(2)],
    });
  }
  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }


  logIn() {
    console.log(this.login.value)
    this.keycloakService.getAccessToken().subscribe((data: any) =>{
      let accessToken = data.access_token;
      this.keycloakService.getUserToken(this.login.value.mail, this.login.value.password, accessToken).subscribe((data:any)=>{
        sessionStorage.setItem("userJwtToken", data.access_token)
      })
    })

    this.userService.logIn(this.login.value );
  }
}
