import { Component, OnInit } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})



export class ProfilePage implements OnInit {

  constructor() { }

  ngOnInit(){

  }
  ngAfterViewInit() {
    axios.get('http://localhost:3000/user/' + sessionStorage.getItem('userToken')).then((response) => {
        console.log(response.data);
        console.log( document.getElementById("nameInput"));
        document.getElementById("nameInput");

      })
  }

  
  
   // inputs: ProfilePage = this.defaultInputs;
  
  
}
