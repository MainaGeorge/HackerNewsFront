import { Pipe, PipeTransform } from "@angular/core";
import { TimeCalculations } from "../services/timeCalculation.service";

@Pipe({name: 'transformDate'})

export class TimePipe implements PipeTransform{

  transform(value: Date) {
      return this.timeCalculationService.constructHowLongAgo(value);
  }


  constructor(private timeCalculationService: TimeCalculations) {
  }

}
