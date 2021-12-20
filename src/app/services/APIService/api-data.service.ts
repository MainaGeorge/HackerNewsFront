import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  Observable } from 'rxjs';
import  { environment } from 'src/environments/environment';
import { IApiComment, IApiStory } from './Api.models';
import {map} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ApiDataService {

  constructor(private http:HttpClient) { }

  public getStoryById(id:number){
    return this.http.get<IApiStory>(`${environment.itemUrl}/${id}.json`);
  }

  private getTop5NewStoriesIds():Observable<number[]>{
    return this.http.get<number[]>(`${environment.topStoriesUrl}`).pipe(
      map(resultArray => resultArray.slice(0, 5))
    );
  }

  public getTop5NewStories(): Observable<IApiStory[]>{
     return this.getTop5NewStoriesIds().pipe(
       map(resultArray => {
          const stories:IApiStory[] = [];
          resultArray.forEach(element => {
              this.getStoryById(element).subscribe(next => stories.push(next), error => console.log(error))
          });
          return stories;
       })
     )
  }

  public getCommentById(id:number):Observable<IApiComment>{
    return this.http.get<IApiComment>(`${environment.itemUrl}/${id}.json`);
  }

}


