import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Comment } from 'src/app/services/app-service/app.comment.model';
import { StoryService } from 'src/app/services/app-service/app.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments-list.component.html',
  styleUrls: ['./comments-list.component.css']
})
export class CommentsComponent{


  comments$: Observable<Comment[]>;

  constructor(public appService: StoryService) {
    this.comments$ = this.appService.targeStoryComments$;
  }
}

