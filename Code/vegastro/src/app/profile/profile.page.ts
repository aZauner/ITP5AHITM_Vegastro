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
      fullname: "",
      id:"",
      firstname:"",
      lastname:"",
      username:"",
      email:""
    }

    
  constructor() { }

  ngOnInit(){

  }
  ngAfterViewInit() {
    axios.get('http://localhost:3000/user/' + sessionStorage.getItem('userToken')).then((response) => {
        this.userData = response.data;
        this.userData.fullname = this.userData.firstname + " " + this.userData.lastname; 
        console.log( this.userData.id);

      })
  }

  updateProfileData(){
    //axios.put('http://localhost:3000/user/')
  }

 

  toggleEditable(){
    this.isEditable = !this.isEditable;
   
  }
  
   // inputs: ProfilePage = this.defaultInputs;
  
  
}
