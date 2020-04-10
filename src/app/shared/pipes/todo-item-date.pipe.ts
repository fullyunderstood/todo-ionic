import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'todoItemDate',
  pure: true
})
export class TodoItemDatePipe implements PipeTransform {

  transform(value: string, ...args: any[]): any {
    const datePipe = new DatePipe('en-US');
    value = datePipe.transform(value, 'MMM dd');
    return value;
  }

}
