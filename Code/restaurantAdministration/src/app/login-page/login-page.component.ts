import { Component } from '@angular/core';
import {UserService} from "../services/user.service";
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

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

  constructor(private formBuilder: FormBuilder,private userService: UserService) {
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
    this.userService.logIn(this.login.value );
  }
}
