import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { UtilService } from 'src/app/shared/services/util.service';
import { TodoService } from 'src/app/shared/services/todo.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  username: string;
  email: string;

  constructor(
    private router: Router,
    private firebaseAuthService: AuthService,
    private utilService: UtilService,
    public todoService: TodoService
  ) { }

  ngOnInit() {
    this.username = this.firebaseAuthService.getCurrentUser().displayName || '-';
    this.email = this.firebaseAuthService.getCurrentUser().email;
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

  editUsername() {
    console.log('Username');
  }
}
