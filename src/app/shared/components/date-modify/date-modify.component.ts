import { Component, OnInit, Input } from '@angular/core';
import { UtilService } from '../../services/util.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-date-modify',
  templateUrl: './date-modify.component.html',
  styleUrls: ['./date-modify.component.scss'],
})
export class DateModifyComponent implements OnInit {
  @Input() date: string;
  @Input() purpose: string;
  @Input() complete: boolean;

  isOverdue = false;

  todaysDate: string;
  tomorrowsDate: string;
  isCalculating = true;
  displayDate = '';

  constructor(
    private utilService: UtilService,
    private datePipe: DatePipe
  ) { }

  ngOnInit() {
    this.todaysDate = this.utilService.getTodaysDate();
    this.tomorrowsDate = this.utilService.getTomorrowsDate();
    this.displayDate = this.getDateText();
    this.isCalculating = false;
  }

  getDateText(): string {
    const transformedDate = this.datePipe.transform(this.date, 'MM/dd/yyyy');
    const transformedTodaysDate = this.datePipe.transform(this.todaysDate, 'MM/dd/yyyy');
    const transformedTomorrowsDate = this.datePipe.transform(this.tomorrowsDate, 'MM/dd/yyyy');

    if (this.itsToday(transformedDate, transformedTodaysDate)) {
      return 'Today';
    } else if (this.itsTomorrow(transformedDate, transformedTomorrowsDate)) {
      return 'Tomorrow';
    } else if (this.itsOverdue(transformedDate, transformedTodaysDate)) {
      this.isOverdue = true;
      return 'Overdue';
    } else {
      return this.datePipe.transform(this.date, 'MMM dd');
    }
  }

  itsToday(date: string, todaysDate: string) {
    return this.compareDates(date, todaysDate) === 0;
  }

  itsTomorrow(date: string, tomorrowsDate: string) {
    return this.compareDates(date, tomorrowsDate) === 0;
  }

  itsOverdue(date: string, todaysDate: string) {
    return this.compareDates(date, todaysDate) === -1;
  }

  compareDates(date1: string, date2: string) {
    const firstDate = new Date(date1);
    const secondDate = new Date(date2);
    if (firstDate > secondDate) {
      return 1;
    } else if (firstDate < secondDate) {
      return -1;
    }
    return 0;
  }
}
