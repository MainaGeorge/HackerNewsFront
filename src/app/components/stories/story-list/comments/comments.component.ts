import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Comment } from 'src/app/services/app-service/app.comment.model';
import { AppStoryService } from 'src/app/services/app-service/app.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent{


  comments$: Observable<Comment[]>;

  constructor(public appService: AppStoryService) {
    this.comments$ = this.appService.targeStoryComments$;
  }
}

