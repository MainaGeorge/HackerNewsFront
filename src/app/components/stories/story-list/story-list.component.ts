import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AppStoryService } from 'src/app/services/app-service/app.service';
import { Story } from 'src/app/services/app-service/app.story.model';

@Component({
  selector: 'app-story-list',
  templateUrl: './story-list.component.html',
  styleUrls: ['./story-list.component.css']
})
export class StoryListComponent implements OnInit {

  stories$!: Observable<Story[]>;
  private readonly TOTAL_STORIES = 7;
  constructor(private appStoryService: AppStoryService) { }

  ngOnInit(): void {
    this.stories$ = this.appStoryService.getStories(this.TOTAL_STORIES);
  }

}
