import { Component, Input, ViewChild } from '@angular/core';
import { IonModal, ModalController } from '@ionic/angular';
import axios from 'axios';
import { UpdateService } from '../services/update.service';


@Component({
  selector: 'comment',
  templateUrl: 'comment.component.html',
  styleUrls: ['comment.component.scss']
})

export class Comment {
  @Input() inputs = { id: "",comment: "",stars: 0, userToken: "", date: new Date()}
  @Input() id = 0

  @ViewChild(IonModal)
  modal!: IonModal;

  isOwnComment = false
  modalOpen = false
  userStarRating = 0
  comment = ""
  formattedDate = "";

  constructor(public modalController: ModalController, private updateService: UpdateService){}

  ngOnInit(){     
    this.formattedDate = new Date(this.inputs.date).toLocaleDateString();    
    
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
    axios.put('http://localhost:3000/rating/updateRating', {      
        id: this.inputs.id,
        comment: this.comment,
        rating: this.userStarRating      
    }).then((response) => {
      this.modal.dismiss(null, 'cancel');
      this.updateService.setNewUpdate(true); 
    }) 
  } 

  deleteComment(){  
    axios.delete('http://localhost:3000/rating/delete/' + this.inputs.id).then((response) => {
      this.updateService.setNewUpdate(true); 
    }) 
  }
  
  ratingChanged(event: number) {
    this.userStarRating = event;
  }
}
