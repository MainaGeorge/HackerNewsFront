import { Component, OnInit } from '@angular/core';
import { error } from 'protractor';
import { ApiDataService } from './services/APIService/api-data.service';
import { IApiStory } from './services/APIService/Api.models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'HNStories';
  ApiStory: IApiStory | undefined ;
  ApiStories: IApiStory[] = [];

  constructor(public apiService: ApiDataService){}

  ngOnInit(): void {
    this.apiService.getStory(8863).subscribe({
      next: story => this.ApiStory = story,
      error: error => console.log(error)
    });

    this.apiService.getTop5Stories().subscribe(res => {
      console.log(res);
      this.ApiStories = res;
    }, error => console.log(error));
  }
}
