import { Component, OnInit } from '@angular/core';
import { AppStoryService } from 'src/app/services/app-service/app.service';
import { AppStory } from 'src/app/services/app-service/app.story.model';

@Component({
  selector: 'app-story-list',
  templateUrl: './story-list.component.html',
  styleUrls: ['./story-list.component.css']
})
export class StoryListComponent implements OnInit {

  stories: Array<AppStory> = []
  constructor(private appStoryService: AppStoryService) { }

  ngOnInit(): void {
    this.appStoryService.getStories(5).subscribe({
      next: stories => {
        this.stories = stories;
     }, error: err => console.log(err) });
  }

}
