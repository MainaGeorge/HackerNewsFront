import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiDataService } from '../APIService/api-data.service';
import { IApiComment, IApiStory } from '../APIService/Api.models';
import { ICoreComment, ICoreStory } from './core.models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CoreServicesService {

  constructor(private http: HttpClient, private apiService: ApiDataService) { }
  private mapApiCommentToCoreComment(apiComment:IApiComment):ICoreComment{
    const coreComment:ICoreComment = {
      id: apiComment.id,
      authorName: apiComment.by,
      date: new Date(apiComment.time),
      message: apiComment.text
    }

    return coreComment;
  }
  private mapApiStoryToCoreStory(apisStory:IApiStory):ICoreStory{
    const coreStory: ICoreStory = {
      id: apisStory.id,
      authorName: apisStory.by,
      comments: [],
      date: new Date(apisStory.time),
      title: apisStory.title,
      totalPoints: apisStory.score,
      selfUrl: apisStory.url
    }

    return coreStory
  }

  public getStory(storyId:number):Observable<ICoreStory>{
    return this.apiService.getStoryById(storyId).pipe(
      map(result => {
        const coreStory = this.mapApiStoryToCoreStory(result);
        if(result.kids){
           result.kids.forEach(entry => {
             this.apiService.getCommentById(entry).subscribe(apiComment => {
               const coreComment = this.mapApiCommentToCoreComment(apiComment);
               coreStory.comments.push(coreComment);
             }, error => console.log(error));
           })
        }
        return coreStory;
      })
    );
  }


  public getTop5NewStories(typeOfStory: string):Observable<ICoreStory[]>{
    const url = typeOfStory.toLowerCase() === "new" ? environment.topStoriesUrl : environment.bestStoriesUrl;
    return this.apiService.getTopStories(url).pipe(
      map(resultingArray => {
        const stories:ICoreStory[] = [];
        resultingArray.forEach(storyId => {
          this.getStory(storyId).subscribe(story => stories.push(story), error => console.log(error));
        })

        return stories;
      })
    )
  }





}
