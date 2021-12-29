import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, Observable, Subject } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { HNStoryApiService } from '../backend-service/backend.HN.service';
import { HNComment } from '../backend-service/backend.hncomment.model';
import { HNStory } from '../backend-service/backend.hnstory.model';
import { Comment } from './app.comment.model';
import { Story } from './app.story.model';

export interface IAppStoryService {
  getStories(numberOfStories: number): Observable<Story[]>;
  getComments(ids: number[]): Observable<Comment[]>;
}

@Injectable({
  providedIn: 'root'
})
export class AppStoryService implements IAppStoryService {


  emittedComments$ = new Subject<Observable<Comment[]>>();
  selectedStoryId$ = new Subject<number>();


  constructor(private hnBackendService: HNStoryApiService) { }

  getStories(numberOfStories: number) :Observable<Story[]>{
    return this.hnBackendService.getTopStoryIds(numberOfStories).pipe(
      mergeMap(ids => {
        const stories$: Observable<Story>[] = [];
        ids.forEach(id => {
          const hnStory$ = this.hnBackendService.getStory(id);
          const appStory$ = this.mapToAppStory(hnStory$);

          stories$.push(appStory$)
        });

        return forkJoin(stories$);
      }
      ))
  }

  getComments(ids: number[]): Observable<Comment[]> {

    const comments: Array<Observable<Comment>> = [];

    ids.forEach(id => {
      const hnComment$ = this.hnBackendService.getComment(id);
      const appComment$ = this.mapToAppComment(hnComment$);
      comments.push(appComment$);

    })
    return forkJoin(comments);
  }

  emitSelectedStoryId(id: number) {
    this.selectedStoryId$.next(id);
  }


  public fetchComments(ids: number[]) {
    this.emittedComments$.next(this.getComments(ids))
  }

  private mapToAppComment(comment:Observable<HNComment>):Observable<Comment>{
    return comment.pipe(
      map(comment => new Comment(comment.id, comment.text, comment.by, new Date(comment.time)))
    );

  }

  private mapToAppStory(story: Observable<HNStory>): Observable<Story> {
    return story.pipe(
      map((story => new Story(story.id, story.title, story.by, new Date(story.time), story.score, story.url, story.kids)))
    );
  }

}
