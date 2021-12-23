import { JsonpClientBackend } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { from, of } from 'rxjs';
import { delay, map, mergeMap } from 'rxjs/operators';
import { ApiDataService } from 'src/app/services/APIService/api-data.service';
import { IApiStory } from 'src/app/services/APIService/Api.models';
import { CoreServices } from 'src/app/services/CoreServices/core-services.service';
import { Story } from 'src/app/services/CoreServices/core.models';
import { AppService } from 'src/app/ServicesRedesigned/app-service/app.service';

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.css']
})
export class ExampleComponent implements OnInit {
  stories: Array<Story> = []
  constructor(private appService:AppService) { }


  ngOnInit(): void {
    this.appService.getTopStoryIds(10).subscribe(result => console.log(result), error => console.log(error));
  }


  // private constructStory(story:IApiStory){
  //   const retrieved = new Story(story.title, story.score, story.url, story.by, new Date(story.time),story.id);
  //   console.log(`${retrieved.title} by ${retrieved.authorName} on ${retrieved.date.toLocaleDateString()}`);
  //   this.stories.push(retrieved);
  // }

}
