import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { AppStoryService } from 'src/app/services/app-service/app.service';
import { Story } from 'src/app/services/app-service/app.story.model';

@Component({
  selector: 'app-story-list',
  templateUrl: './story-list.component.html',
  styleUrls: ['./story-list.component.css']
})
export class StoryListComponent implements OnInit, OnDestroy {

  stories$!: Observable<Story[]>;

  highlightedStoryIdSubscription!: Subscription;
  highlightedStoryId!: number

  private readonly TOTAL_STORIES = 5;
  constructor(private appStoryService: AppStoryService) { }

  ngOnInit(): void {
    this.stories$ = this.appStoryService.getStories(this.TOTAL_STORIES);
    this.highlightedStoryIdSubscription = this.appStoryService.selectedStoryId$.subscribe(id => this.highlightedStoryId = id,
      error => console.log(error))
  }

  ngOnDestroy(): void {
    this.highlightedStoryIdSubscription.unsubscribe();
  }

}
