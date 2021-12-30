import { Component, Input, OnInit } from '@angular/core';
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

  onStorySelected():void {
    this.appStoryService.setTargetStory(this.story);
  }


}
