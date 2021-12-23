import { Observable } from "rxjs";

export interface ICoreComment extends IBaseInterface{
  message: string;
}

export interface ICoreStory extends IBaseInterface {
  title: string;
  totalPoints: number;
  selfUrl: string;
  comments: Array<Observable<ICoreComment>>[]

}

export interface IBaseInterface {
  authorName: string;
  date: Date;
  id:number;
}

export class Story {
  constructor(public title:string,
     public totalPoints:number,
     public selfUrl:string,
     public authorName: string,
     public date:Date,
     public id: number,
     public comments?: ICoreComment[]) {
  }
}



