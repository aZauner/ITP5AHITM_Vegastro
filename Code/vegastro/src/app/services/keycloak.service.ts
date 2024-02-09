import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class KeycloakService {

  constructor(private http : HttpClient) { }

  createUser(token : string){
    let testData = {
      "username": "testuser2",
      "email": "testuser@example2.com",
      "enabled": true,
      "credentials": [
      {
        "type": "password",
        "value": "testpassword",
        "temporary": false
      }
    ],
      "clientRoles": {
      "client_id": ["admin_role"]
    }
    }

    console.log(testData)

    return this.http.post("/admin/realms/vegastroRealm/users", testData, {
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
