import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { DbService } from './db.service';
import { UtilService } from './util.service';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(
    public afAuth: AngularFireAuth,
    private firebaseDbService: DbService,
    private utilService: UtilService,
    private router: Router
  ) { }

  async deleteTodo(todoId: string) {
    try {
      await this.utilService.presentLoading();
      await this.firebaseDbService.deleteTodo(todoId);
      await this.utilService.dismissLoading();
    } catch (error) {
      await this.utilService.dismissLoading();
      this.utilService.presentToast('Oops', error.message, 1000, 'danger');
    }
  }

  async completeTodo(todoId: string) {
    try {
      await this.utilService.presentLoading();
      await this.firebaseDbService.completeTodo(todoId);
      await this.utilService.dismissLoading();
      this.utilService.presentToast('Moved to Completed Todos', '', 500, 'success');
    } catch (error) {
      await this.utilService.dismissLoading();
      this.utilService.presentToast('Oops', error.message, 1000, 'danger');
    }
  }

  async restoreTodo(todoId: string) {
    try {
      await this.utilService.presentLoading();
      await this.firebaseDbService.restoreTodo(todoId);
      await this.utilService.dismissLoading();
      this.utilService.presentToast('Moved to Active Todos', '', 500, 'success');
    } catch (error) {
      await this.utilService.dismissLoading();
      this.utilService.presentToast('Oops', error.message, 1000, 'danger');
    }
  }

  async deleteAllCompletedTodos() {
      await this.utilService
        .presentAlertDelete(
          'Delete all completed todos',
          'Do you really want to delete all completed todos?',
          'Cancel',
          'Yes, delete!',
          this,
          this.deleteAllCompletedTodosActual
      );
  }

  async deleteAllCompletedTodosActual() {
    try {
      await this.utilService.presentLoading();
      await this.firebaseDbService.deleteAllCompletedTodos();
      await this.utilService.dismissLoading();
      await this.utilService.presentToast('Deleted successfully', '', 500, 'success');
    } catch (error) {
      await this.utilService.dismissLoading();
      await this.utilService.presentToast('Oops', error.message, 1000, 'danger');
    }
  }

  async deleteUserAccount() {
    const alertData = await this.utilService
      .presentAlertDeleteWithPassword(
        'Delete account',
        'Your account & related data will be deleted',
        'Cancel',
        'Confirm'
    );
    if (alertData != null) {
      await this.deleteUserAccountActual(alertData);
    } else {
      await this.utilService.presentToast('Oops', 'Password entered is empty, please try again', 1000, 'danger');
    }
  }

  async deleteUserAccountActual(password: string) {
    try {
      await this.utilService.presentLoading();
      await this.firebaseDbService.deleteUserAccount(password);
      await this.router.navigate(['/login']);
      await this.utilService.dismissLoading();
      await this.utilService.presentToast('Deleted account successfully', '', 500, 'success');
    } catch (error) {
      await this.utilService.dismissLoading();
      await this.utilService.presentToast('Oops', error.message, 1000, 'danger');
    }
  }
}
