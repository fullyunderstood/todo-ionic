import { Injectable } from '@angular/core';
import { ToastController, Platform, LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  loading: HTMLIonLoadingElement;

  constructor(
    private platform: Platform,
    private toastController: ToastController,
    private loadingController: LoadingController
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

  isNativePlatform() {
    return this.platform.is('hybrid');
  }
}
