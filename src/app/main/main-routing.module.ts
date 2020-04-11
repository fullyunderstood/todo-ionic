import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainPage } from './main.page';
import { MainGuard } from '../shared/guards/main.guard';

const routes: Routes = [
  {
    path: '',
    component: MainPage,
    canActivate: [MainGuard],
    children: [
      {
        path: 'todo/:id',
        pathMatch: 'full',
        loadChildren: () => import('../pages/todo/todo.module').then(m => m.TodoPageModule)
      },
      {
        path: 'create-todo',
        loadChildren: () => import('../pages/create-todo/create-todo.module').then(m => m.CreateTodoPageModule)
      },
      {
        path: 'todos',
        loadChildren: () => import('../pages/todos/todos.module').then(m => m.TodosPageModule)
      },
      {
        path: 'completed',
        loadChildren: () => import('../pages/complete/complete.module').then(m => m.CompletePageModule)
      },
      {
        path: 'settings',
        loadChildren: () => import('../pages/settings/settings.module').then(m => m.SettingsPageModule)
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'todos'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainPageRoutingModule {}
