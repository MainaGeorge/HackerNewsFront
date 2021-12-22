export interface ICoreComment extends IBaseInterface{
  message: string;
}

export interface ICoreStory extends IBaseInterface {
  title: string;
  totalPoints: number;
  selfUrl: string;
  comments: ICoreComment[]

}

export interface IBaseInterface {
  authorName: string;
  date: Date;
  id:number;
}



