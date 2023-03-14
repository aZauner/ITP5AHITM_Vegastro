import { Component, Input } from '@angular/core';

@Component({
  selector: 'comment',
  templateUrl: 'comment.component.html',
  styleUrls: ['comment.component.scss']
})

export class Comment {
  @Input() inputs = {comment: "",stars: 0}
}
