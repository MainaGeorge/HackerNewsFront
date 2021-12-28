import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { HNStoryApiService } from '../backend-service/backend.HN.service';
import { HNComment } from '../backend-service/backend.hncomment.model';
import { HNStory } from '../backend-service/backend.hnstory.model';
import { AppComment } from './app.comment.model';
import { AppStory } from './app.story.model';

export interface IAppStoryService {
  getStories(numberOfStories: number): Observable<HNStory[]>;
  getComments(ids: number[]): Observable<HNComment[]>;
}

@Injectable({
  providedIn: 'root'
})
export class AppStoryService implements IAppStoryService{

  constructor(private hnBackendService: HNStoryApiService) { }

  getStories(numberOfStories: number) {
    return this.hnBackendService.getTopStoryIds(numberOfStories).pipe(
      mergeMap(ids => {
        const stories$: Observable<HNStory>[] = [];
        ids.forEach(id => stories$.push(this.hnBackendService.getStory(id)));

        return forkJoin(stories$);
      }
    ))
  }

  getComments(ids:number[]):Observable<HNComment[]>{
    const comments: Array<Observable<HNComment>> = [];

    ids.map(id => comments.push(this.hnBackendService.getComment(id)));
    return forkJoin(comments);
  }


  mapToAppComment(comment:HNComment):AppComment{
    return new AppComment(comment.id, comment.text, comment.by, new Date(comment.time));

  }

  mapToAppStory(story:HNStory){
   return new AppStory(story.id, story.title, story.by, new Date(story.time), story.score, story.url, story.kids)
  }

}
