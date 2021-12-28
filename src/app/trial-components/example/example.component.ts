import { Component, OnInit } from '@angular/core';
import { AppStory } from 'src/app/ServicesRedesigned/app-service/app.story.model';
import { AppStoryService } from 'src/app/ServicesRedesigned/app-service/app.service';
import { AppComment } from 'src/app/ServicesRedesigned/app-service/app.comment.model';

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.css']
})
export class ExampleComponent implements OnInit {
  appStories: Array<AppStory> = []
  appComments: Array<AppComment> = []
  constructor(private appService:AppStoryService) { }


  ngOnInit(): void {
    this.appService.getStories(5).subscribe(stories => {
      console.log(stories)
      stories.forEach(story => {
        const appStory = this.appService.mapToAppStory(story);

        this.appStories.push(appStory);
      })
    }, error => console.log(error))

  }

  getComments(ids: number[]) {
    this.appService.getComments(ids).subscribe(comments => {
      console.log(comments)
      const appComments:Array<AppComment> = [];
      comments.forEach(comment => appComments.push(this.appService.mapToAppComment(comment)))
      this.appComments = appComments;
    })
  }




}
