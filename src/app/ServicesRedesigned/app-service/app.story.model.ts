import { AppComment } from "./app.comment.model";

export class AppStory{
  constructor(
        public id: number,
        public title: string,
        public authorName: string,
        public date: Date,
        public comments: AppComment[],
        public totalPoints: number,
        public selfUrl: string,
        public commentsId: number[]){}

}