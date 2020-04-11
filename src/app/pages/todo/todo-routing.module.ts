import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TodoPage } from './todo.page';
import { TodoResolver } from './todo.resolver';

const routes: Routes = [
  {
    path: '',
    component: TodoPage,
    resolve: { todoInfo: TodoResolver }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TodoPageRoutingModule {}
