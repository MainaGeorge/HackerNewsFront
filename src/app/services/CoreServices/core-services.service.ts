import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { map, mergeMap, tap } from 'rxjs/operators';
import { ApiDataService } from '../APIService/api-data.service';
import { IApiComment, IApiStory } from '../APIService/Api.models';
import { ICoreComment, ICoreStory } from './core.models';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CoreServices {

  constructor(private apiService: ApiDataService) { }

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
      date: new Date(apisStory.time),
      title: apisStory.title,
      totalPoints: apisStory.score,
      selfUrl: apisStory.url,
      comments: []
    }
    return coreStory
  }

  public getCommentById(commentId:number):Observable<ICoreComment>{
     return this.apiService.getCommentById(commentId).pipe(
       map(apiComment => {
         const coreComment = this.mapApiCommentToCoreComment(apiComment);
         return coreComment;
       })
     )
  }

  getCommentsTest(storyId:number){
    return this.getStoryTest(storyId).pipe()
  }

  getStoryTest(storyId:number){
    return this.apiService.getStoryById(storyId);
  }

  // public getStory(storyId:number):Observable<ICoreStory>{
  //   return this.apiService.getStoryById(storyId).pipe(
  //     map(result => {
  //       const coreStory = this.mapApiStoryToCoreStory(result);
  //       if(result.kids){
  //         let comments: ICoreComment[] = [];
  //          result.kids.forEach(entry => {
  //            this.apiService.getCommentById(entry).subscribe(apiComment => {
  //              const coreComment = this.mapApiCommentToCoreComment(apiComment);
  //             comments.push(coreComment);
  //            }, error => console.log(error), () => {
  //             comments.sort((a,b) => b.id - a.id);
  //             coreStory.comments = comments.slice(0,5);
  //             // console.log(comments.slice(0,5))
  //            });

  //          });

  //          coreStory.comments = comments
  //       }
  //       return coreStory;
  //     })
  //   );
  // }


  // public getTop5NewStories(typeOfStory: string, numberOfStories:number):Observable<ICoreStory[]>{
  //   const url = typeOfStory.toLowerCase() === "new" ? environment.topStoriesUrl : environment.bestStoriesUrl;
  //   return this.apiService.getTopStories(url, numberOfStories).pipe(
  //     map(resultingArray => {
  //       const stories:ICoreStory[] = [];
  //       resultingArray.forEach(storyId => {
  //         this.getStory(storyId).subscribe(story => stories.push(story), error => console.log(error));
  //       })

  //       return stories;
  //     })
  //   )
  // }





}
