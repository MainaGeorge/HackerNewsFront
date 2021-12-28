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

  comments: Array<AppComment> = [];

  constructor(private appStoryService: AppStoryService) { }

  ngOnInit(): void {
  }

  getComments() {
    this.showComments = !this.showComments;
    if (this.comments.length < 1) {
      this.appStoryService.getComments(this.commentsIds).subscribe(comments => this.comments = comments,
        err => console.log(err))
    }
  }

}
