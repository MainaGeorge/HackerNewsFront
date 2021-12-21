export interface HNStory extends IBaseInterface{
  descendants: number;
  score: number;
  title: string;
  url: string;
}

export interface IApiComment extends IBaseInterface {
 parent: number;
 text: string;
}

export interface IBaseInterface {
  by: string;
  id: number;
  time: number;
  type: string;
  kids?: number[];

}
