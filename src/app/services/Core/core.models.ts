export interface ICoreComment extends IBaseInterface{
  message: string;
}

export interface ICoreStory extends IBaseInterface {
  title: string;
  comments: ICoreComment[]
  totalPoints: number;
  selfUrl: string;
}

export interface IBaseInterface {
  authorName: string;
  date: Date;
  id:number;
}



