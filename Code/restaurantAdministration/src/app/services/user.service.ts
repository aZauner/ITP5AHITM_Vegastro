import { Injectable } from '@angular/core';
import axios from 'axios';
import {Router} from "@angular/router";
import { BASE_URL } from '../components';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  foundUser = false;
  constructor(private router: Router) { }

  logIn(loginData: {mail:string, password:string}) {
    sessionStorage.clear()
    axios.post(BASE_URL+'/user/login', { email: loginData.mail, password: loginData.password })
      .then((response) => {
        console.log(response)
        if (response.data != "") {
          console.log(response.data);
          sessionStorage.setItem("userToken",  response.data);
          this.foundUser = true;
          this.router.navigate(['/dashboard']);
        } else {
          this.foundUser = false;
          console.log("Not logged in")
        }
      });
  }
}
