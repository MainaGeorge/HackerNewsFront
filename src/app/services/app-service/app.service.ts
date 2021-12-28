import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { HNStoryApiService } from '../backend-service/backend.HN.service';
import { HNComment } from '../backend-service/backend.hncomment.model';
import { HNStory } from '../backend-service/backend.hnstory.model';
import { AppComment } from './app.comment.model';
import { AppStory } from './app.story.model';

export interface IAppStoryService {
  getStories(numberOfStories: number): Observable<AppStory[]>;
  getComments(ids: number[]): Observable<AppComment[]>;
}

@Injectable({
  providedIn: 'root'
})
export class AppStoryService implements IAppStoryService {

  constructor(private hnBackendService: HNStoryApiService) { }

  getStories(numberOfStories: number) :Observable<AppStory[]>{
    return this.hnBackendService.getTopStoryIds(numberOfStories).pipe(
      mergeMap(ids => {
        const stories$: Observable<AppStory>[] = [];
        ids.forEach(id => {
          const hnStory$ = this.hnBackendService.getStory(id);
          const appStory$ = this.mapToAppStory(hnStory$);

          stories$.push(appStory$)
        });

        return forkJoin(stories$);
      }
      ))
  }

  getComments(ids: number[]): Observable<AppComment[]> {

    const comments: Array<Observable<AppComment>> = [];

    ids.forEach(id => {
      const hnComment$ = this.hnBackendService.getComment(id);
      const appComment$ = this.mapToAppComment(hnComment$);
      comments.push(appComment$);

    })
    return forkJoin(comments);
  }



  private mapToAppComment(comment:Observable<HNComment>):Observable<AppComment>{
    return comment.pipe(
      map(comment => new AppComment(comment.id, comment.text, comment.by, new Date(comment.time)))
    );

  }

  private mapToAppStory(story: Observable<HNStory>): Observable<AppStory> {
    return story.pipe(
      map((story => new AppStory(story.id, story.title, story.by, new Date(story.time), story.score, story.url, story.kids)))
    );
  }

}
