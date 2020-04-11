import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { DateModifyComponent } from './components/date-modify/date-modify.component';

@NgModule({
  declarations: [
    DateModifyComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DateModifyComponent
  ],
  providers: [
    DatePipe
  ]
})
export class SharedModule { }
