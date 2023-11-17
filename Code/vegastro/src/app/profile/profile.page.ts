import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { BASE_URL } from '../constants';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})



export class ProfilePage implements OnInit {
  isEditable = false;
  userData = {
    id: "",
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
    oldPassword: "",
    newPassword: "",
    newConfirmedPassword: ""
  }

  errorMessage = "";

  constructor() { }

  ngOnInit() {

  }
  ngAfterViewInit() {

    axios.get(BASE_URL + '/user/' + sessionStorage.getItem('userToken')).then((response) => {
      this.userData = response.data;

    })
  }

  updateProfileData() {

    axios.put(BASE_URL + '/auth/changeData', {
      "token": sessionStorage.getItem('userToken'),
      "oldPassword": this.userData.oldPassword,
      "newPassword": this.userData.newPassword,
      "confirmedPassword": this.userData.newConfirmedPassword,
      "firstname": this.userData.firstname,
      "lastname": this.userData.lastname,
      "username": this.userData.username
    }).then((response) => {
      if (response.data.status != 200) {
        this.errorMessage = response.data.message;

      }
    });

    //bcrypt.hash("asd", 12);
    /**  axios.put('http://10.0.2.2:3000/user/changeUserData', {      
        "token": sessionStorage.getItem('userToken'),
        "firstname": this.userData.firstname,
        "lastname": this.userData.lastname,
        "username": this.userData.username,
        "email": this.userData.email      
      }) */
    this.isEditable = !this.isEditable;

  }



  toggleEditable() {
    this.isEditable = !this.isEditable;
  }

  // inputs: ProfilePage = this.defaultInputs;


}
