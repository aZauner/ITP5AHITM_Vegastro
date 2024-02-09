import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class KeycloakService {

  constructor(private http : HttpClient) { }

  createUser(){

  }

  getAccessToken(){
    let body = new HttpParams()
      .set('client_id', 'vegastro')
      .set('client_secret', 'dUcuXkSV6dV1oNl6Edah2gXCCmCVNVKh')
      .set('grant_type', 'client_credentials');

    console.log(body.toString())
    return this.http.post("/realms/vegastroRealm/protocol/openid-connect/token", body.toString(), {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
    })
  }

  assignRoleToUser(){

  }

  getUserToken(){

  }
}
