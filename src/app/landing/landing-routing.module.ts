import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPage } from './landing.page';
import { LandingGuard } from '../shared/guards/landing.guard';

const routes: Routes = [
  {
    path: '',
    component: LandingPage,
    canActivate: [LandingGuard],
    children: [
      // {
      //   path: '',
      //   loadChildren: () => import('../pages/welcome/welcome.module').then(m => m.WelcomePageModule)
      // },
      {
        path: 'login',
        loadChildren: () => import('../pages/login/login.module').then(m => m.LoginPageModule)
      },
      {
        path: 'signup',
        loadChildren: () => import('../pages/signup/signup.module').then(m => m.SignupPageModule)
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LandingPageRoutingModule {}
