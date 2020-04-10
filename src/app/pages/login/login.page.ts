import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LOGIN } from 'src/app/shared/constants/form-validation-messages.constant';
import { FormHelperService } from 'src/app/shared/services/form-helper.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { UtilService } from 'src/app/shared/services/util.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;
  email: FormControl;
  password: FormControl;

  formError: any = {
    email: '',
    password: ''
  };

  validationMessages: any = LOGIN;

  loginInProgress = false;

  constructor(
    private router: Router,
    private formHelperService: FormHelperService,
    private firebaseAuthService: AuthService,
    private utilService: UtilService
  ) { }

  ngOnInit() {
    this.createFormControl();
    this.createForm();
  }

  createFormControl() {
    this.email = new FormControl('', [
      Validators.required,
      Validators.email
    ]);

    this.password = new FormControl('', [
      Validators.required,
      Validators.minLength(5)
    ]);
  }

  createForm() {
    this.loginForm = new FormGroup({
      email: this.email,
      password: this.password
    });
    this.loginForm.valueChanges.subscribe(data => this.onFormValueChanges());
  }

  onFormValueChanges() {
    this.formError = this.formHelperService
      .prepareValidationMessage(this.loginForm, this.validationMessages, this.formError);
  }

  resetForm() {
    this.loginForm.reset();
    this.formError = {
      email: '',
      password: ''
    };
  }

  async login() {
    try {
      this.loginInProgress = true;
      const result = await this.firebaseAuthService.loginWithEmailAndPassword(this.email.value, this.password.value);
      this.utilService.presentToast('Successfully logged in 😊', `Welcome back, ${result.user.displayName}!`, 2000, 'success');
      this.onSuccessfulLogin();
      this.loginInProgress = false;
    } catch (error) {
      this.loginInProgress = false;
      this.utilService.presentToast('Oops 😰', error.message, 2000, 'danger');
    }
  }

  onSuccessfulLogin() {
    this.resetForm();
    this.router.navigate(['/main/todos']);
  }

  async googleLogin() {
    if (this.utilService.isNativePlatform()) {
      await this.googleNativeLogin();
    } else {
      await this.googleWebLogin();
    }
  }

  async googleNativeLogin() {
    try {
      this.loginInProgress = true;
      const result = await this.firebaseAuthService.googleLoginNative();
      this.onSuccessfulLogin();
      this.loginInProgress = false;
    } catch (error) {
      this.utilService.presentToast('Oops 😰', error.message, 2000, 'danger');
      this.loginInProgress = false;
    }
  }

  async googleWebLogin() {
    try {
      this.loginInProgress = true;
      await this.firebaseAuthService.googleLoginWeb();
      this.onSuccessfulLogin();
      this.loginInProgress = false;
    } catch (error) {
      this.utilService.presentToast('Oops 😰', error.message, 2000, 'danger');
      this.loginInProgress = false;
    }
  }

  goToSignUpPage() {
    this.resetForm();
    this.router.navigate(['signup']);
  }

  goToForgotPassword() {
    this.resetForm();
    this.router.navigate(['/forgot-password']);
  }
}
