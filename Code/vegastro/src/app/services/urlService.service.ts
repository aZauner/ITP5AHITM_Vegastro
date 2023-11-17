import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UpdateService {

  BASE_URL = "http://10.0.2.2:3000";


  constructor() { }

  getBaseUrl() {
    return this.BASE_URL;
  }


}
