import { Injectable } from "@angular/core";


@Injectable({ providedIn: 'root' })
export class TimeCalculations{

  constructor() { }

   private minutesInMilliseconds = 1000 * 60;
   private hoursInMilliseconds = this.minutesInMilliseconds * 60;
   private dayInMilliseconds = this.hoursInMilliseconds * 24;
   private weekInMillisecond = this.dayInMilliseconds * 7;
   private monthInMilliseconds = this.weekInMillisecond * 4;
   private yearInMilliseconds = this.monthInMilliseconds * 12;

  toHowLongAgo(date: Date) : string{
    const todaysDate = new Date();
    const timeDifferenceInMilliseconds = todaysDate.getTime() - date.getTime();

    if (timeDifferenceInMilliseconds > this.yearInMilliseconds) {
      return `${Math.floor(timeDifferenceInMilliseconds / this.yearInMilliseconds)} years ago`;
    }

    if (timeDifferenceInMilliseconds > this.monthInMilliseconds) {
      return `${Math.floor(timeDifferenceInMilliseconds / this.monthInMilliseconds)} months ago`;;
    }

    if (timeDifferenceInMilliseconds > this.weekInMillisecond){
      return `${Math.floor(timeDifferenceInMilliseconds / this.weekInMillisecond)} weeks ago`;
    }

    if (timeDifferenceInMilliseconds > this.dayInMilliseconds) {
      return `${Math.floor(timeDifferenceInMilliseconds / this.dayInMilliseconds)} days ago`;
    }

    if (timeDifferenceInMilliseconds > this.hoursInMilliseconds) {
      return `${Math.floor(timeDifferenceInMilliseconds / this.hoursInMilliseconds)} hours ago`;
    }

    if (timeDifferenceInMilliseconds > this.minutesInMilliseconds) {
      return `${Math.floor(timeDifferenceInMilliseconds / this.minutesInMilliseconds)} minutes ago`;
    }

    return `${Math.floor(timeDifferenceInMilliseconds/1000)} seconds ago`
  }
}
