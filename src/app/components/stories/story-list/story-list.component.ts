import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { StoryService } from 'src/app/services/app-service/app.service';
import { Story } from 'src/app/services/app-service/app.story.model';

@Component({
  selector: 'app-story-list',
  templateUrl: './story-list.component.html',
  styleUrls: ['./story-list.component.css']
})
export class StoryListComponent {
  private readonly TOTAL_STORIES = 8;
  private readonly STORY_KIND = 'best';

  stories$!: Observable<Story[]>;
  highlightedStory$: Observable<Story>;

  constructor(private appStoryService: StoryService) {
    this.highlightedStory$ = this.appStoryService.targetStory$;
    this.stories$ = this.appStoryService.getStories(this.STORY_KIND, this.TOTAL_STORIES);
  }

}
