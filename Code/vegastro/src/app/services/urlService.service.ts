import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UpdateService {

  BASE_URL = "https://student.cloud.htl-leonding.ac.at/a.zauner/vegastro";


  constructor() { }

  getBaseUrl() {
    return this.BASE_URL;
  }


}
