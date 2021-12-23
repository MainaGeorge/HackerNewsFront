import { Component, OnInit } from '@angular/core';
import { AppComment } from 'src/app/ServicesRedesigned/app-service/app.comment.model';
import { AppStory } from 'src/app/ServicesRedesigned/app-service/app.story.model';
import { AppService } from 'src/app/ServicesRedesigned/app-service/app.service';
import { HNComment } from 'src/app/ServicesRedesigned/backend-service/backend.hncomment.model';
import { HNStory } from 'src/app/ServicesRedesigned/backend-service/backend.hnstory.model';

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.css']
})
export class ExampleComponent implements OnInit {
  stories: Array<AppStory> = []
  constructor(private appService:AppService) { }


  ngOnInit(): void {
    this.appService.getStories(3).subscribe(stories => {
      const hnStory = stories.story;
      const hNComments = stories.comments;
      const appComments: AppComment[] = []
      hNComments.forEach(hnComment => appComments.push(this.constructAppComment(hnComment)));
      const appStory = this.constructAppStory(hnStory, appComments);

      this.stories.push(appStory);

    }, error => console.log(error));

    this.appService.getStoryWithComments(29627105).subscribe()

  }


  private constructAppComment(comment:HNComment):AppComment{
    const appComment = new AppComment(comment.id, comment.text, comment.by, new Date(comment.time));
    return appComment;
  }

  private constructAppStory(story:HNStory, comment:AppComment[]){
   return new AppStory(story.id, story.title, story.by, new Date(story.time), comment, story.score, story.url, story.kids)
  }

}
