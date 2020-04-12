import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { UtilService } from '../../services/util.service';
import { NavParams } from '@ionic/angular';

@Component({
  selector: 'app-profile-menu',
  templateUrl: './profile-menu.component.html',
  styleUrls: ['./profile-menu.component.scss'],
})
export class ProfileMenuComponent implements OnInit {

  @Input() name: string;
  @Input() email: string;

  constructor(
    private router: Router,
    private firebaseAuthService: AuthService,
    private utilService: UtilService,
    private param: NavParams
  ) { }

  ngOnInit() {
    this.name = this.param.get('displayName');
    this.email = this.param.get('email');
  }

  async logoutAction() {
    try {
      await this.firebaseAuthService.logout();
      this.closePopover();
      this.utilService.presentToast('Logged out!', 'Waiting for you to return ❤', 2000, 'success');
      this.router.navigate(['/login']);
    } catch (error) {
      this.utilService.presentToast('Oops 😰', error.message, 2000, 'danger');
    }
  }

  closePopover() {
    this.param.get('reference').dismissPopover();
  }

  changeTheme(event: any) {
    document.body.classList.toggle('dark', event.detail.checked);
  }
}
