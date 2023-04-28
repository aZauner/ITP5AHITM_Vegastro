import { Component, Input, ViewChild } from '@angular/core';
import { IonModal, ModalController } from '@ionic/angular';


@Component({
  selector: 'comment',
  templateUrl: 'comment.component.html',
  styleUrls: ['comment.component.scss']
})

export class Comment {
  @Input() inputs = {comment: "",stars: 0, userToken: ""}
  @Input() id = 0

  @ViewChild(IonModal)
  modal!: IonModal;

  isOwnComment = false
  modalOpen = false

  constructor(public modalController: ModalController){}

  ngOnInit(){      
    if(this.inputs.userToken == sessionStorage.getItem("userToken")){
      this.isOwnComment = true; 
    }
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm(){
    console.log("vvcx");    
  }  
}
