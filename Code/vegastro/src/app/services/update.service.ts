import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UpdateService {

  newUpdate = new Subject<boolean>


  constructor() { }

  setNewUpdate(update: boolean){
    this.newUpdate.next(update);
  }


}
