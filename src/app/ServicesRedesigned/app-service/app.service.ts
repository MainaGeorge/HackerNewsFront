import { Injectable } from '@angular/core';
import { forkJoin, Observable, of } from 'rxjs';
import { concatMap, mergeMap, tap } from 'rxjs/operators';
import { HNBackendService } from '../backend-service/backend.HN.service';
import { HNComment } from '../backend-service/backend.hncomment.model';
import { HNStory } from '../backend-service/backend.hnstory.model';
import { HNStoryWithHNComments } from "../backend-service/HNStoryWithHNComments";



export interface IAppService {
  getStory(id: number):Observable<HNStory>;
  getTopStoryIds(numberOfStories: number):Observable<number>;
  getComments(commentIds:number[]):Observable<HNComment>[];
  getStoryWithComments(id:number): Observable<HNStoryWithHNComments>;
}

@Injectable({
  providedIn: 'root'
})
export class AppService implements IAppService{

  constructor(private hnBackendService: HNBackendService) { }

  getStory(id: number):Observable<HNStory>{
    return this.hnBackendService.getStory(id);
  }

  getTopStoryIds(numberOfStories: number):Observable<number> {
    return this.hnBackendService.getStoryIds(numberOfStories).pipe(
      mergeMap((idsArray) => {
        return of(...idsArray)
      })
    );
  }

  getStories(numberOfStories: number):Observable<HNStoryWithHNComments>{
    return this.getTopStoryIds(numberOfStories).pipe(
      mergeMap(id => this.getStoryWithComments(id)),
    )
  }

  getComments(commentIds:number[]):Observable<HNComment>[]{
    const comments:Array<Observable<HNComment>> = [];
    commentIds.map(id => comments.push(this.hnBackendService.getComment(id)));
    return comments;
  }

  getStoryWithComments(id:number): Observable<HNStoryWithHNComments>{
    const story$ = this.getStory(id);
    const comments$ = this.getStory(id).pipe(concatMap(story => forkJoin(this.getComments(story.kids))))
    return forkJoin({story: story$, comments:comments$}).pipe(
      tap(result => console.log(result))
    )
  }

}
