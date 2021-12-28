import { Component, Input, OnInit } from '@angular/core';
import { AppComment } from 'src/app/services/app-service/app.comment.model';
import { AppStoryService } from 'src/app/services/app-service/app.service';
import { AppStory } from 'src/app/services/app-service/app.story.model';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.css']
})
export class StoryComponent implements OnInit {

  @Input()
  story!: AppStory;

  @Input()
  commentsIds!: Array<number>;
  showComments = false;

  commentToBeAdded = '';

  comments: Array<AppComment> = [];

  constructor(private appStoryService: AppStoryService) { }

  ngOnInit(): void {
    this.getComments();
  }

  getComments() {
    this.appStoryService.getComments(this.commentsIds).subscribe(comments => {
      this.comments = comments;
    },
        err => console.log(err))
  }

  displayComments() {
    this.showComments = !this.showComments;
    if (this.comments.length < 1) {
      this.getComments();
    }
  }

  addComment() {
    if (!this.commentToBeAdded) return;
    const comment = new AppComment(this.commentsIds[0] + 1, this.commentToBeAdded, 'new author', new Date());

    this.comments.unshift(comment);
    this.commentToBeAdded = '';
  }

}
