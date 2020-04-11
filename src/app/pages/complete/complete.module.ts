import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CompletePageRoutingModule } from './complete-routing.module';

import { CompletePage } from './complete.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CompletePageRoutingModule,
    SharedModule
  ],
  declarations: [CompletePage]
})
export class CompletePageModule {}
