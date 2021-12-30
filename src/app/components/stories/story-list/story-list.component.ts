import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AppStoryService } from 'src/app/services/app-service/app.service';
import { Story } from 'src/app/services/app-service/app.story.model';

@Component({
  selector: 'app-story-list',
  templateUrl: './story-list.component.html',
  styleUrls: ['./story-list.component.css']
})
export class StoryListComponent {
  private readonly TOTAL_STORIES = 5;
  private readonly STORY_KIND = 'best';

  stories$!: Observable<Story[]>;
  highlightedStory$: Observable<Story>;

  constructor(private appStoryService: AppStoryService) {
    this.highlightedStory$ = this.appStoryService.targetStory$;
    this.stories$ = this.appStoryService.getStories(this.STORY_KIND, this.TOTAL_STORIES);
  }

}
