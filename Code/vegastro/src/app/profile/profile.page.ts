import { Component, OnInit } from '@angular/core';
import axios from 'axios';

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
    password: ""
  }


  constructor() { }

  ngOnInit() {

  }
  ngAfterViewInit() {
    axios.get('http://localhost:3000/user/' + sessionStorage.getItem('userToken')).then((response) => {
      this.userData = response.data;
      console.log(this.userData);

    })
  }

  updateProfileData() {
    console.log(2);
    
    axios.put('http://localhost:3000/user/changeUserData', {      
      "token": sessionStorage.getItem('userToken'),
      "firstname": this.userData.firstname,
      "lastname": this.userData.lastname,
      "username": this.userData.username,
      "email": this.userData.email      
    })
    this.isEditable = !this.isEditable;

}



toggleEditable(){
  this.isEditable = !this.isEditable;

}

   // inputs: ProfilePage = this.defaultInputs;
  
  
}
