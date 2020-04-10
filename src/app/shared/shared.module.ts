import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoItemDatePipe } from './pipes/todo-item-date.pipe';



@NgModule({
  declarations: [TodoItemDatePipe],
  imports: [
    CommonModule
  ],
  exports: [
    TodoItemDatePipe
  ]
})
export class SharedModule { }
