import { Component, OnInit } from '@angular/core';
import { CoreServicesService } from './services/CoreServices/core-services.service';
import { ICoreComment, ICoreStory } from './services/CoreServices/core.models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'HNStories';
  corestory: ICoreStory | undefined;
  topStories: ICoreStory[] = [];
  bestStories: ICoreStory[] = []
  apiComment: ICoreComment | undefined;

  constructor(public coreService: CoreServicesService){}

  ngOnInit(): void {

    this.coreService.getStory(8863)
    .subscribe(story => {
      this.corestory = story;
    }, error => console.log(error))

    this.coreService.getTop5NewStories("new",1)
    .subscribe(stories => this.topStories = stories, error => console.log(error));

    this.coreService.getTop5NewStories("top",2)
    .subscribe(stories => this.bestStories = stories, error => console.log(error));

    this.coreService.getCommentById(8873)
    .subscribe(comment => this.apiComment= comment, error => console.log(error));

  }
}
