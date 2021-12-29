import { Component, Input, OnInit } from '@angular/core';
import { Comment } from 'src/app/services/app-service/app.comment.model';
import { AppStoryService } from 'src/app/services/app-service/app.service';
import { Story } from 'src/app/services/app-service/app.story.model';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.css']
})
export class StoryComponent implements OnInit {

  @Input()
  story!: Story;

  @Input()
  isSelected!: boolean;

  constructor(private appStoryService: AppStoryService) { }

  ngOnInit(): void {
  }

  activateComments() {
    this.appStoryService.fetchComments(this.story.commentsIds);
    this.appStoryService.emitSelectedStoryId(this.story.id);
  }


}
