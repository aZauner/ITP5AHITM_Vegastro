import { Component, Input, ViewChild } from '@angular/core';
import { IonModal, ModalController } from '@ionic/angular';
import axios from 'axios';


@Component({
  selector: 'comment',
  templateUrl: 'comment.component.html',
  styleUrls: ['comment.component.scss']
})

export class Comment {
  @Input() inputs = { id: "",comment: "",stars: 0, userToken: ""}
  @Input() id = 0

  @ViewChild(IonModal)
  modal!: IonModal;

  isOwnComment = false
  modalOpen = false
  userStarRating = 0
  comment = ""

  constructor(public modalController: ModalController){}

  ngOnInit(){      
    if(this.inputs.userToken == sessionStorage.getItem("userToken")){
      this.isOwnComment = true; 
      this.userStarRating = this.inputs.stars
      this.comment = this.inputs.comment
    }
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm(){
    console.log(this.comment);
    console.log(this.userStarRating);
    console.log(this.inputs.id);
    
    axios.put('http://localhost:3000/rating/updateRating', {      
        id: this.inputs.id,
        comment: this.comment,
        rating: this.userStarRating      
    }).then((response) => {
      this.modal.dismiss(null, 'cancel');
      }) 
  } 
  
  ratingChanged(event: number) {
    this.userStarRating = event;
  }
}
