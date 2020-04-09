import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FORGOT_PASSWORD } from 'src/app/shared/constants/form-validation-messages.constant';
import { FormHelperService } from 'src/app/shared/services/form-helper.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { UtilService } from 'src/app/shared/services/util.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {
  forgotPasswordForm: FormGroup;
  email: FormControl;

  formError: any = {
    email: '',
  };

  validationMessages: any = FORGOT_PASSWORD;

  resetPasswordInProgress = false;

  constructor(
    private formHelperService: FormHelperService,
    private firebaseAuthService: AuthService,
    private utilService: UtilService,
    private router: Router
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
  }

  createForm() {
    this.forgotPasswordForm = new FormGroup({
      email: this.email
    });
    this.forgotPasswordForm.valueChanges.subscribe(data => this.onFormValueChanges());
  }

  onFormValueChanges() {
    this.formError = this.formHelperService
      .prepareValidationMessage(this.forgotPasswordForm, this.validationMessages, this.formError);
  }

  resetForm() {
    this.forgotPasswordForm.reset();
    this.formError = {
      email: '',
      password: ''
    };
  }

  async resetPassword() {
    try {
      this.resetPasswordInProgress = true;
      const result = await this.firebaseAuthService.resetPasswordWithEmail(this.email.value);
      this.utilService.presentToast('Password reset successful 👍', 'Please check your email to set new password.', 4000, 'success');
      this.resetPasswordInProgress = false;
      this.resetForm();
      this.router.navigate(['/login']);
    } catch (error) {
      this.resetPasswordInProgress = false;
      this.utilService.presentToast('Oops 😰', error.message, 2000, 'danger');
    }
  }
}
