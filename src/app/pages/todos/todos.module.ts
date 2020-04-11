import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TodosPageRoutingModule } from './todos-routing.module';

import { TodosPage } from './todos.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TodosPageRoutingModule,
    SharedModule
  ],
  declarations: [
    TodosPage
  ]
})
export class TodosPageModule {}
