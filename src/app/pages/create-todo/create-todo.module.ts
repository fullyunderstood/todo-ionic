import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateTodoPageRoutingModule } from './create-todo-routing.module';

import { CreateTodoPage } from './create-todo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CreateTodoPageRoutingModule
  ],
  declarations: [CreateTodoPage]
})
export class CreateTodoPageModule {}
