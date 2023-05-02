import { Component } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-konto',
  templateUrl: './konto.component.html',
  styleUrls: ['./konto.component.scss']
})
export class KontoComponent {
  isEditable = false;

  errorMessage = "";

  constructor() { }


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

  ngAfterViewInit() {

    axios.get('http://localhost:3000/user/' + sessionStorage.getItem('userToken')).then((response) => {
      this.userData = response.data;
      console.log(this.userData);
      
    })
  }

  ngOnInit(){
  }
  toggle(){
    this.isEditable = !this.isEditable
  }

  update(){

    if(this.userData.oldPassword !== undefined && this.userData.newPassword!== undefined && this.userData.newConfirmedPassword !==undefined){
    axios.put('http://localhost:3000/auth/changeData', {
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
  }
    //bcrypt.hash("asd", 12);
    /**  axios.put('http://localhost:3000/user/changeUserData', {      
        "token": sessionStorage.getItem('userToken'),
        "firstname": this.userData.firstname,
        "lastname": this.userData.lastname,
        "username": this.userData.username,
        "email": this.userData.email      
      }) */
    this.isEditable = !this.isEditable;
  }
}
