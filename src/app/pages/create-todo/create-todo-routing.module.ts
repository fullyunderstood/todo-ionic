import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateTodoPage } from './create-todo.page';

const routes: Routes = [
  {
    path: '',
    component: CreateTodoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateTodoPageRoutingModule {}
