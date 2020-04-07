import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPage } from './landing.page';

const routes: Routes = [
  {
    path: '',
    component: LandingPage,
    children: [
      {
        path: '',
        loadChildren: () => import('../pages/login/login.module').then(m => m.LoginPageModule)

      //   loadChildren: () => import('../pages/welcome/welcome.module').then(m => m.WelcomePageModule)
      // },
      // {
      //   path: 'signin',
      //   loadChildren: () => import('../pages/login/login.module').then(m => m.LoginPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LandingPageRoutingModule {}
