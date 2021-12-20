import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  Observable } from 'rxjs';
import  { environment } from 'src/environments/environment';
import { IApiStory } from './Api.models';
import {map} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ApiDataService {

  constructor(private http:HttpClient) { }

  public getStory(id:number){
    return this.http.get<IApiStory>(`${environment.baseUrl}/${id}.json`);
  }

  public getTop5StoriesIds():Observable<number[]>{
    return this.http.get<number[]>(`${environment.topStoriesUrl}`).pipe(
      map(resultArray => resultArray.slice(0, 5)),
    );
  }

  public getTop5Stories(): Observable<IApiStory[]>{
     return this.getTop5StoriesIds().pipe(
       map(resultArray => {
          const stories:IApiStory[] = [];
          resultArray.forEach(element => {
              this.getStory(element).subscribe(next => stories.push(next), error => console.log(error))
          });
          return stories;
       })
     )
  }
}


