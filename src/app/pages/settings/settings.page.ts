import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from 'src/app/core/services/auth.service';
import { UtilService } from 'src/app/shared/services/util.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  constructor(
    private router: Router,
    private firebaseAuthService: AuthService,
    private utilService: UtilService
  ) { }

  ngOnInit() {
  }

  async logoutAction() {
    try {
      await this.firebaseAuthService.logout();
      this.utilService.presentToast('Logged out!', 'Waiting for you to return ❤', 2000, 'success');
      this.router.navigate(['/login']);
    } catch (error) {
      this.utilService.presentToast('Oops 😰', error.message, 2000, 'danger');
    }
  }
}
