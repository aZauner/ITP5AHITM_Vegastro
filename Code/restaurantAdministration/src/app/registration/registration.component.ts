import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { ActivatedRoute } from '@angular/router';
import axios from 'axios';
import { BASE_URL } from '../components';
import {KeycloakService} from "../services/keycloak.service";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {
  hide = true;


  user =
    {
      firstname: '',
      lastname: '',
      username: '',
      email: '',
      password: '',
    };


  formBuilder: FormBuilder = new FormBuilder();

  firstFormGroup = this.formBuilder.group({
    firstname: ['', Validators.minLength(1)],
    lastname: ['', Validators.minLength(2)],
    username: ['', Validators.minLength(1)],
    email: ['', Validators.minLength(2)],
    password: ['', Validators.minLength(2)],

  });

  constructor(private route: ActivatedRoute, private keycloakService:KeycloakService) {}

  ngOnInit() {
  }

  create() {
    this.user.firstname = this.firstFormGroup.value.firstname!;
    this.user.lastname = this.firstFormGroup.value.lastname!;
    this.user.username = this.firstFormGroup.value.username!;
    this.user.email = this.firstFormGroup.value.email!;
    this.user.password = this.firstFormGroup.value.password!;
    console.log(this.user);

    this.keycloakService.getAccessToken().subscribe((data: any) =>{
      let accessToken = data.access_token;
      console.log(accessToken)
      this.keycloakService.createUser(accessToken, this.user.username, this.user.email, this.user.firstname, this.user.lastname, this.user.password).subscribe((data) =>{
        console.log(data)
        this.keycloakService.getUserToken(this.user.email, this.user.password, accessToken).subscribe((data:any)=>{
          let jwtToken = data.access_token

          var base64Url = jwtToken.split('.')[1];
          var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
          var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
          }).join(''));

          jwtToken = JSON.parse(jsonPayload) ;

          this.keycloakService.getRole("admin_role", accessToken).subscribe((data)=>{
            let roledata = data;

            this.keycloakService.mapRole(roledata, jwtToken.sub, accessToken).subscribe()
          })
        })
      })

    })

    axios
      .post(BASE_URL+'/user/register', this.user)
      .then((response) => {
       console.log(response);

      });
  }





}
