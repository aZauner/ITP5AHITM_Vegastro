import { Injectable } from '@angular/core';
import axios from 'axios';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  foundUser = false;
  constructor(private router: Router) { }

  logIn(loginData: {mail:string, password:string}) {
    sessionStorage.clear()
    //let loginData = this.login.value;
    axios.post('http://localhost:3000/auth/login', { email: loginData.mail, password: loginData.password })
      .then((response) => {
        if (response.data.status != 404) {
          sessionStorage.setItem("userToken", response.data.token);
          this.foundUser = true;
          this.router.navigate(['/dashboard']);
        } else {
          this.foundUser = false;
          console.log("Not logged in")
        }
      });
  }
}
