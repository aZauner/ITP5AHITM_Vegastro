import { Component, Input, ViewChild } from '@angular/core';
import { IonModal, ModalController, ToastController } from '@ionic/angular';
import axios from 'axios';
import { UpdateService } from '../services/update.service';
import { Router } from '@angular/router';
import { BASE_URL } from '../constants';
import { log } from 'console';


@Component({
  selector: 'comment',
  templateUrl: 'comment.component.html',
  styleUrls: ['comment.component.scss']
})

export class Comment {
  @Input() inputs = { id: "",comment: "",stars: 0, user: {id: 0}, date: new Date()}
  @Input() id = 0

  @ViewChild(IonModal)
  modal!: IonModal;

  isOwnComment = false
  modalOpen = false
  userStarRating = 0
  comment = ""
  formattedDate = "";
  upvotes = [{userToken: "" , rating: {id: ""}}]
  alreadyLikeComment = false;
  commentUpvotes = 0 ;
  loggedIn = false


  constructor(public modalController: ModalController, private updateService: UpdateService, private toastController: ToastController, private router: Router){}

  ngOnInit(){     
    this.formattedDate = new Date(this.inputs.date).toLocaleDateString();    
    if (sessionStorage.getItem("userToken")) {
      console.log(sessionStorage.getItem("userToken"));
      this.loggedIn = true
      if (this.inputs.user.id == parseInt(sessionStorage.getItem("userToken")!)) {
        console.log(this.inputs);

        this.isOwnComment = true;
        this.userStarRating = this.inputs.stars
        this.comment = this.inputs.comment
      }    
    }
    
    this.downloadLikes()

  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  downloadLikes() {
    if (this.loggedIn) {
      axios.get(BASE_URL+'/ratingupvotes/getByUser/' + sessionStorage.getItem('userToken')).then((response) => {
        this.upvotes = response.data;
        console.log(this.upvotes);        
        this.isCommentLiked()
      })
    }

    axios.get(BASE_URL+'/ratingupvotes/getSumVotes/' + this.inputs.id).then((response) => {
      this.commentUpvotes = response.data
    })
  }

  async callToast(duration: number) {
    const toast = await this.toastController.create({
      message: 'Nicht angemeldet',
      duration: duration,
      position: 'middle',
      icon: 'person-circle-outline',
      cssClass: 'favToast',
      buttons: [
        {
          text: 'Anmelden',
          role: 'login',
          handler: () => { this.router.navigateByUrl("/login") }
        }
      ]
    });
    await toast.present();
  }

  isCommentLiked(){
    let found = false
      for (const upvote of this.upvotes) {
        if(upvote.rating.id == this.inputs.id){
          found = true  
        }
      }

      if(found){
        this.alreadyLikeComment = true
      }else{
        this.alreadyLikeComment = false
      }
  }

  confirm(){
    axios.put(BASE_URL+'/rating/updateRating', {      
        id: this.inputs.id,
        comment: this.comment,
        rating: this.userStarRating      
    }).then((response) => {
      this.modal.dismiss(null, 'cancel');
      setTimeout(()=>{
        this.updateService.setNewUpdate(true); 
      } , 300)      
    }) 
  } 

  deleteComment(){  
    axios.delete(BASE_URL+'/rating/delete/' + this.inputs.id).then((response) => {
      this.updateService.setNewUpdate(true); 
    }) 
  }

  deleteUpvoteComment(){
    axios.put(BASE_URL+'/ratingupvotes/delete', {
          userId: sessionStorage.getItem('userToken'),
          ratingId: this.inputs.id        
        }).then((response) => {          
          this.downloadLikes()        
        })   
  }
  
  ratingChanged(event: number) {
    this.userStarRating = event;
  }

  upvoteComment() {   
    console.log(sessionStorage.getItem('userToken'));
    console.log(this.inputs.id);
    axios.post(BASE_URL+'/ratingupvotes/create', {
      user: { id: parseInt(sessionStorage.getItem('userToken')!) },
      rating: { id: this.inputs.id }        
        }).then((response) => {      
          this.downloadLikes()        
        })
  }


}
