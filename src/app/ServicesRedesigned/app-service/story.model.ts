export class Story{
  constructor(
        public id: number,
        public title: string,
        public authorName: string,
        public date: number,
        //public comment$s: Observable <Comment>[],
        public totalPoints: number,
        public selfUrl: string,
        public commentsId: number[]){} //Add '?'

}
