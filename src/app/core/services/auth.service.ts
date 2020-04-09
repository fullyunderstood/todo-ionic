import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { UtilService } from 'src/app/shared/services/util.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedin = false;

  constructor(
    private afAuth: AngularFireAuth,
    private googlePlus: GooglePlus,
    private utilService: UtilService
  ) { }

  async registerWithEmailAndPassword(email: string, password: string) {
    try {
      const result = await this.afAuth.auth.createUserWithEmailAndPassword(email, password);
      await this.afAuth.auth.currentUser.sendEmailVerification();
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  async loginWithEmailAndPassword(email: string, password: string) {
    try {
      const result = await this.afAuth.auth.signInWithEmailAndPassword(email, password);
      await this.afAuth.auth.currentUser.sendEmailVerification();
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  async resetPasswordWithEmail(email: string) {
    try {
      await this.afAuth.auth.sendPasswordResetEmail(email);
    } catch (error) {
      throw new Error(error);
    }
  }

  async logout() {
    try {
      await this.afAuth.auth.signOut();
      // if (this.utilService.isNativePlatform()) {
      //   await this.googlePlus.logout();
      // }
    } catch (error) {
      throw new Error(error);
    }
  }

  async googleLoginWeb() {
    try {
      await this.afAuth.auth.signInWithRedirect(new auth.GoogleAuthProvider());
    } catch (error) {
      throw new Error(error);
    }
  }

  async googleLoginNative() {
    try {
      const result = await this.googlePlus.login({
        webClientId: '436502872708-b65ulia0e0ohr45jragbhbdjod1laqju.apps.googleusercontent.com',
        offline: true,
        scope: 'profile email'
      });
      await this.afAuth.auth.signInWithCredential(auth.GoogleAuthProvider.credential(result.idToken));
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  getAuthState() {
    return this.afAuth.authState;
  }
}
