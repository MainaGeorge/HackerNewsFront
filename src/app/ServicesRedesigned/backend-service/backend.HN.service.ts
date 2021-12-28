import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { map} from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { HNComment } from './backend.hncomment.model';
import { HNStory} from './backend.hnstory.model';

@Injectable({
  providedIn: 'root'
})
export class HNStoryApiService{

  constructor(private httpClient: HttpClient) { }

  getTopStoryIds(numberOfStories:number):Observable<number[]>{
    return this.httpClient.get<number[]>(`${environment.bestStoriesUrl}`).pipe(
      map((resultingArray) => resultingArray.slice(0, numberOfStories)),
    );
  }


  getStory(id:number, numberOfComments=5):Observable<HNStory>{
    return this.httpClient.get<HNStory>(`${environment.BASE_ITEM_URL}/${id}.json`).pipe(
      map(story => {
        if (story.kids) {
          //take the most recent 5 comments
          const topFiveComments = story.kids.sort((a,b) => b-a).slice(0,numberOfComments);
          story.kids = topFiveComments;
        }
        return story;
      }),
    );
  }


  getComment(id: number):Observable<HNComment>{
    return this.httpClient.get<HNComment>(`${environment.BASE_ITEM_URL}/${id}.json`);
  }
}
