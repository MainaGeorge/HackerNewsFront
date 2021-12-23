import { Injectable } from '@angular/core';
import { forkJoin, from, Observable, of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { HNBackendService } from '../backend-service/backend.HN.service';
import { HNComment } from '../backend-service/backend.hncomment.model';
import { HNStory } from '../backend-service/backend.hnstory.model';

export interface IAppService {
  getStory(id: number): Observable<HNStory>;
  getTopStoryIds(numberOfStories: number):Observable<number>;
  getComment(id: number): Observable<HNComment>;
}


@Injectable({
  providedIn: 'root'
})
export class AppService implements IAppService{

  constructor(private hnBackendService: HNBackendService) { }


  getStory(id: number): Observable<HNStory> {
    return this.hnBackendService.getStory(id)
  }

  getTopStoryIds(numberOfStories: number):Observable<number> {
    return this.hnBackendService.getStoryIds(numberOfStories).pipe(
      mergeMap((idsArray) => {
        return of(...idsArray)
      })
    );
  }

  getComment(id: number): Observable<HNComment> {
    return this.hnBackendService.getComment(id);
  }
}
