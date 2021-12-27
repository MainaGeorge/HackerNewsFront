import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { mergeMap, concatMap} from 'rxjs/operators';
import { HNBackendService } from '../backend-service/backend.HN.service';
import { HNComment } from '../backend-service/backend.hncomment.model';
import { HNStoryWithHNComments } from "../backend-service/HNStoryWithHNComments";

export interface IAppService {
  getComments(commentIds: number[]): Observable<HNComment>[];
  getStoryWithComment(id: number): Observable<HNStoryWithHNComments>
  getStories(numberOfStories: number):Observable<HNStoryWithHNComments>
}

@Injectable({
  providedIn: 'root'
})
export class AppService implements IAppService{

  constructor(private hnBackendService: HNBackendService) { }


  getStories(numberOfStories: number):Observable<HNStoryWithHNComments>{
    return this.hnBackendService.getTopStoryIds(numberOfStories).pipe(
      mergeMap(id => this.getStoryWithComment(id)),
    )
  }

  getComments(ids:number[]):Observable<HNComment>[]{
    return this.hnBackendService.getComments(ids);
  }


  getStoryWithComment(id: number): Observable<HNStoryWithHNComments>{
    return this.hnBackendService.getStoryWithComment(id);
  }

}
