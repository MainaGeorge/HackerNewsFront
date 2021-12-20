import { Component, OnInit } from '@angular/core';
import { error } from 'protractor';
import { ApiDataService } from './services/APIService/api-data.service';
import { IApiComment, IApiStory } from './services/APIService/Api.models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'HNStories';
  ApiStory: IApiStory | undefined ;
  ApiStories: IApiStory[] = [];
  ApiComment: IApiComment | undefined;

  constructor(public apiService: ApiDataService){}

  ngOnInit(): void {
    this.apiService.getStoryById(8863).subscribe({
      next: story => this.ApiStory = story,
      error: error => console.log(error)
    });

    this.apiService.getTop5NewStories().subscribe(res => {
      console.log(res);
      this.ApiStories = res;
    }, error => console.log(error));

    this.apiService.getCommentById(8873).subscribe(comment => this.ApiComment= comment, error => console.log(error));
  }
}
