import {Component, Input, OnInit, Sanitizer } from '@angular/core';
import { Comment } from 'src/app/services/app-service/app.comment.model';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  @Input() comment!: Comment;
  constructor() {}

  ngOnInit(): void {
  }

}
