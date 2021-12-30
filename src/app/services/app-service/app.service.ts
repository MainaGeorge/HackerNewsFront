import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, Observable, Subject } from 'rxjs';
import { filter, map, mergeMap } from 'rxjs/operators';
import { HNStoryApiService } from '../backend-service/backend.HN.service';
import { Comment } from './app.comment.model';
import { Story } from './app.story.model';

export interface IAppStoryService {
  getStories(storyKind:string, numberOfStories: number): Observable<Story[]>;
  getComments(ids: number[]): Observable<Comment[]>;
}

@Injectable({
  providedIn: 'root'
})
export class AppStoryService implements IAppStoryService {

  private requestedComments$ = new BehaviorSubject<Comment[]>([]);
  private selectedStory$ = new Subject<Story>();

  currentStory!: Story;
  targeStoryComments$ = this.requestedComments$.asObservable();
  targetStory$ = this.selectedStory$.asObservable();

  constructor(private hnBackendService: HNStoryApiService) { }

  getStories(storyKind:string,numberOfStories: number) :Observable<Story[]>{
    return this.hnBackendService.getTopStoryIds(storyKind, numberOfStories)
      .pipe(
        mergeMap(ids => {
          const stories$: Observable<Story>[] = [];
          ids?.forEach(id => {
            stories$.push(this.hnBackendService.getStory(id)
              .pipe(
                filter(story => story.type === 'story'),
                map((story => new Story(story.id, story.title, story.by,
                          new Date(story.time * 1000), story.score, story.url, story.descendants, story.kids)))))
            });
          return forkJoin(stories$);
        })
      )

  }

  getComments(ids: number[]): Observable<Comment[]> {
    const comments: Array<Observable<Comment>> = [];

    ids?.forEach(id => {
      comments.push(this.hnBackendService.getComment(id).pipe(
        map(comment => new Comment(comment.id, comment.text, comment.by, new Date(comment.time * 1000)))));
    })
    return forkJoin(comments);
  }

  setTargetStory(story: Story) {
    this.currentStory = story;
    this.selectedStory$.next(story);

    //set the comments for the selected story
    this.getComments(story.commentsIds).subscribe(comments => this.requestedComments$.next(comments),
      error => console.log(error));
  }

}
