import { Injectable } from '@angular/core';
import { ToastController, Platform, LoadingController, AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  loading: HTMLIonLoadingElement;

  constructor(
    private platform: Platform,
    private toastController: ToastController,
    private loadingController: LoadingController,
    private alertController: AlertController
  ) { }

  async presentToast(header: string, message: string, durationInMilliseconds?: number, status?: string) {
    const toast = await this.toastController.create({
      header,
      message,
      position: this.platform.is('desktop') ? 'top' : 'bottom',
      keyboardClose: true,
      duration: durationInMilliseconds ? durationInMilliseconds : 800,
      color: status ? status : 'dark'
    });
    toast.present();
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Please wait...'
    });
    await this.loading.present();
  }

  async dismissLoading() {
    if (this.loading) {
      await this.loading.dismiss();
    }
  }

  async presentAlertDelete(
    header: string,
    message: string,
    cancelButtonName: string,
    confirmButtonName: string,
    context: object,
    confirmAction: () => {}
  ) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: [
        {
          text: cancelButtonName,
          role: 'cancel'
        }, {
          text: confirmButtonName,
          handler: confirmAction.bind(context)
        }
      ]
    });

    await alert.present();
  }

  async presentAlertDeleteWithPassword(
    header: string,
    message: string,
    cancelButtonName: string,
    confirmButtonName: string
  ) {
    let password;
    const alert = await this.alertController.create({
      header,
      message,
      inputs: [
        {
          type: 'password',
          placeholder: 'Enter passowrd',
          name: 'password',
        }
      ],
      buttons: [
        {
          text: cancelButtonName,
          role: 'cancel'
        }, {
          text: confirmButtonName,
          handler: data => {}
        }
      ]
    });

    await alert.present();
    await alert.onDidDismiss().then((result) => {
      if (result != null) {
        password = result.data.values.password;
      }
    });
    return password;
  }

  isNativePlatform() {
    return this.platform.is('hybrid');
  }

  getTodaysDate(): string {
    return (new Date()).toISOString();
  }

  getTomorrowsDate(): string {
    const tomorrowsDate = new Date();
    tomorrowsDate.setDate(tomorrowsDate.getDate() + 1);
    return tomorrowsDate.toISOString();
  }
}
