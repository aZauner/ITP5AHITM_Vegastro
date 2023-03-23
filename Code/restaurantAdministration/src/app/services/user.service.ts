import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  loggedIn = new Subject<boolean>();

  logIn(){
    this.loggedIn.next(true)
  }
  
}
