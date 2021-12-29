import { Component, OnInit, Input } from '@angular/core';
import { Comment } from 'src/app/services/app-service/app.comment.model';
import { AppStoryService } from 'src/app/services/app-service/app.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  @Input() commentsIds!: Array<number>;

  comments!: Array<Comment>;
  comment!: Comment;


  constructor(private appService: AppStoryService) { }

  ngOnInit(): void {
    this.appService.getComments(this.commentsIds).subscribe(res => {
      this.comments = res;
    })

  }

}
