import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, from, Observable, of} from 'rxjs';
import { concatMap, map, mergeMap, tap} from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { HNComment } from './backend.hncomment.model';
import { HNStory} from './backend.hnstory.model';
import { HNStoryWithHNComments } from './HNStoryWithHNComments';

@Injectable({
  providedIn: 'root'
})
export class HNBackendService{

  constructor(private httpClient: HttpClient) { }

  getTopStoryIds(numberOfStories:number):Observable<number>{
    return this.httpClient.get<number[]>(`${environment.bestStoriesUrl}`).pipe(
      map((resultingArray) => resultingArray.slice(0, numberOfStories)),
      mergeMap(resultingArray => from(resultingArray))
    );
  }


  getStory(id:number):Observable<HNStory>{
    return this.httpClient.get<HNStory>(`${environment.BASE_ITEM_URL}/${id}.json`).pipe(
      map(story => {
        if(story.kids){
          const bestFiveComments = story.kids.sort((a,b) => b-a).slice(0,5);
          story.kids = bestFiveComments;
        }
        return story;
      }),
      tap(story => console.log("got a story")),
    );
  }

  getComment(id: number):Observable<HNComment>{
    return this.httpClient.get<HNComment>(`${environment.BASE_ITEM_URL}/${id}.json`);
  }


  getComments(ids:number[]):Observable<HNComment>[]{
    const comments: Array<Observable<HNComment>> = [];

    ids.map(id => comments.push(this.getComment(id)));
    console.log('got comments for story');
    return comments;
  }

  getStoryWithComment(id: number): Observable<HNStoryWithHNComments>{
    return this.getStory(id).pipe(concatMap(story => {

      //if a post has no coments we just return an empty array
      const comments$: Observable<HNComment>[] = [];

      if (story?.kids?.length > 0) {
        // obtain an array of observable of comments
        story.kids.forEach(id => comments$.push(this.getComment(id)));
      }


      //sorround the story with an of to make it an observable to avoid calling the backend twice for each request
      //merge the array of comments [flatten it] to form one inner observable of all the comments using forkjoin
      //merge the observable of story and comments together to build an object of a story with comments
      return forkJoin({ hnStory:of(story), hnComments:forkJoin(comments$) })

    })
   )
  }
}
