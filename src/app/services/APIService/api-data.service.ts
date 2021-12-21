import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  Observable } from 'rxjs';
import { environment } from './../../../environments/environment';
import { IApiComment as HNComment, HNStory } from './Api.models';
import {map} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ApiDataService {

  constructor(private http: HttpClient) { }

  getTopStoryIds(url: string, numberOfStories: number): Observable<number[]>{
      return this.http.get<number[]>(`${url}`).pipe(
        map((resultingArray) => resultingArray.slice(0, numberOfStories))
      );
  }

  getStory(id: number): Observable<HNStory> {
    return this.http.get<HNStory>(`${environment.BASE_ITEM_URL}/${id}.json`);
  }

  getComment(id: number): Observable<HNComment>{
    return this.http.get<HNComment>(`${environment.BASE_ITEM_URL}/${id}.json`);
  }

}


