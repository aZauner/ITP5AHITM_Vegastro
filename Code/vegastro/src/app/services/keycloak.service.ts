import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {ValidatorFn} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class KeycloakService {

  constructor(private http : HttpClient) { }

  createUser(token: string, username : string, email: string, firstName: string, lastName: string, password: string){

    let registrationData = {
      "username": username,
      "email": email,
      "firstName": firstName,
      "lastName": lastName,
      "enabled": true,
      "credentials": [
        {
          "type": "password",
          "value": password,
          "temporary": false
        }
      ],
    }

    console.log(registrationData)

    return this.http.post("/admin/realms/vegastroRealm/users", registrationData, {
      headers: new HttpHeaders()
        .set('authorization', "Bearer "+token)
    })
  }

  getAccessToken(){
    let body = new HttpParams()
      .set('client_id', 'vegastro')
      .set('client_secret', 'dUcuXkSV6dV1oNl6Edah2gXCCmCVNVKh')
      .set('grant_type', 'client_credentials');

    return this.http.post( "/realms/vegastroRealm/protocol/openid-connect/token", body.toString(), {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
    })
  }

  assignRoleToUser(){

  }

  getUserToken(username: string, password:string , token:string){
    let body = new HttpParams()
      .set('client_id', 'vegastro')
      .set('client_secret', 'dUcuXkSV6dV1oNl6Edah2gXCCmCVNVKh')
      .set('grant_type', 'password')
      .set('username', username)
      .set('password', password);

    return this.http.post( "/realms/vegastroRealm/protocol/openid-connect/token", body.toString(), {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('authorization', "Bearer "+token)
    })
  }
}
