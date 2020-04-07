import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';

import { LoginPage } from './login.page';

import { FirebaseUIModule } from 'firebaseui-angular';
import { firebaseUiAuthConfig } from 'src/app/shared/config/config';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginPageRoutingModule,
    FirebaseUIModule.forFeature(firebaseUiAuthConfig)
  ],
  declarations: [LoginPage]
})
export class LoginPageModule {}
