import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { HNComment } from './backend.hncomment.model';
import { HNStory } from './backend.hnstory.model';

@Injectable({
  providedIn: 'root'
})
export class HNBackendService {

  constructor(private httpClient: HttpClient) { }

  getStoryIds(numberOfStories:number):Observable<number[]>{
    return this.httpClient.get<number[]>(`${environment.topStoriesUrl}`).pipe(
      map((resultingArray) => resultingArray.slice(0, numberOfStories))
    );
  }


  getStory(id:number){
    return this.httpClient.get<HNStory>(`${environment.BASE_ITEM_URL}/${id}.json`);
  }


  getComment(id: number){
    return this.httpClient.get<HNComment>(`${environment.BASE_ITEM_URL}/${id}.json`);
  }
}
