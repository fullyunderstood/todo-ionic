import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { DateModifyComponent } from './components/date-modify/date-modify.component';
import { ProfileLogoButtonComponent } from './components/profile-logo-button/profile-logo-button.component';
import { ProfileMenuComponent } from './components/profile-menu/profile-menu.component';
// Import your AvatarModule
import { AvatarModule } from 'ngx-avatar';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    DateModifyComponent,
    ProfileMenuComponent,
    ProfileLogoButtonComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    AvatarModule,
    HttpClientModule
  ],
  exports: [
    DateModifyComponent,
    ProfileLogoButtonComponent,
    ProfileMenuComponent,
    AvatarModule
  ],
  providers: [
    DatePipe
  ],
  entryComponents: [
    ProfileMenuComponent
  ]
})
export class SharedModule { }
