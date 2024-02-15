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
      "username": email,
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
      .set('client_secret', '82ehw2b7lSalhr325HYQskdDod125NeO')
      .set('grant_type', 'client_credentials');

    return this.http.post( "/realms/vegastroRealm/protocol/openid-connect/token", body.toString(), {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
    })
  }

  assignRoleToUser(){

  }

  getUserToken(email: string, password:string , token:string){
    let body = new HttpParams()
      .set('client_id', 'vegastro')
      .set('client_secret', '82ehw2b7lSalhr325HYQskdDod125NeO')
      .set('grant_type', 'password')
      .set('username', email)
      .set('password', password);

    return this.http.post( "/realms/vegastroRealm/protocol/openid-connect/token", body.toString(),{
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
    })
  }

  getRole(name : string, token:string){
    return this.http.get( "/admin/realms/vegastroRealm/clients/6e105bf8-def4-474e-9802-2c2ab869a5b9/roles/"+ name, {
      headers: new HttpHeaders()
        .set('authorization', "Bearer "+token)
    })
  }

  mapRole(roleData:any, userId: string, token:string){
    let body = [roleData]

    return this.http.post( "/admin/realms/vegastroRealm/users/"+ userId +"/role-mappings/clients/6e105bf8-def4-474e-9802-2c2ab869a5b9", body, {
      headers: new HttpHeaders()
        .set('authorization', "Bearer "+token)
    })
  }
}
