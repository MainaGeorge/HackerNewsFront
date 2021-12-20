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

  public getTopStories(url: string, numberOfStories:number):Observable<number[]>{
      return this.http.get<number[]>(`${url}`).pipe(
        map((resultingArray) => resultingArray.slice(0,numberOfStories+1))
      );
  }

  public getStoryById(id:number){
    return this.http.get<IApiStory>(`${environment.itemUrl}/${id}.json`);
  }

  public getCommentById(id:number):Observable<IApiComment>{
    return this.http.get<IApiComment>(`${environment.itemUrl}/${id}.json`);
  }

}


