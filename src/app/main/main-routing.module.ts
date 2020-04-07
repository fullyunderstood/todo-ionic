import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainPage } from './main.page';

const routes: Routes = [
  {
    path: '',
    component: MainPage,
    children: [
      {
        path: 'todo',
        pathMatch: 'full',
        loadChildren: () => import('../pages/todo/todo.module').then(m => m.TodoPageModule)
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
