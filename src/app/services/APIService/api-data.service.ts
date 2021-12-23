import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


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



  getStoriesTest(){
    return this.http.get<number[]>(`${environment.bestStoriesUrl}`).pipe(
      map(res => res.sort((a, b) => b - a).slice(0,5)),
      map(ids => {
        const stories:Observable<IApiStory>[] = [];
        ids.forEach(id => stories.push(this.getStoryById(id)));
        return stories
      }),
      mergeMap(res =>{
        return forkJoin(res)
      }),
     )
  }

  getComments(storyId:number){
    return this.getStoryById(storyId).pipe(
      tap(res => console.log(res)),
      mergeMap(res => {
        const comments :Observable<IApiComment>[] = []
        if(res.kids){
          res.kids.forEach(kidId => this.getCommentById(kidId));
        }
        return forkJoin(comments);
    }),
    tap(r => console.log(r))
    )
  }

  getCommentsTest(ids:number[]):Observable<IApiComment>[]{
    const comments: Observable<IApiComment>[] = [];
    ids.forEach(id => {
        comments.push(this.getCommentById(id))
    })
    return comments;
  }

  getStoryTest(id:number){
    return this.getStoryById(id).pipe(
      tap(res => console.log(res)),
      mergeMap(story => {
        return forkJoin(this.getCommentsTest(story.kids))
      }),
      tap(res => console.log(res))
    )
  }


  practice(){
    return of("hound", "mastiff", "retriever")
    .pipe(
      mergeMap(breed => {
        const url1 = 'https://dog.ceo/api/breed/' + breed + '/list';
        const url2 = 'https://dog.ceo/api/breed/' + breed + '/images/random';

        let obs1= this.http.get<any>(url1)
        let obs2= this.http.get<any>(url2)

        return forkJoin([obs1,obs2])
      })
    )
  }

}

