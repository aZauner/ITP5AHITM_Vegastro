import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot,RouterStateSnapshot } from '@angular/router';


@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private _router:Router ) {
  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): boolean {

    //check some condition
    if (sessionStorage.getItem("userToken") == undefined)  {
      this._router.navigateByUrl("/login")
      //redirect to login/home page etc
      //return false to cancel the navigation
      return false;
    }
    return true;

  }

}
