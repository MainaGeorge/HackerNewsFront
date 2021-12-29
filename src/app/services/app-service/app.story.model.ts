import { Comment } from "./app.comment.model";

export class Story{
  constructor(
        public id: number,
        public title: string,
        public authorName: string,
        public date: Date,
        public totalPoints: number,
        public selfUrl: string,
        public commentsIds: number[]){}

}
