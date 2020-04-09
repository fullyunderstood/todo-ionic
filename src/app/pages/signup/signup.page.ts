import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormHelperService } from 'src/app/shared/services/form-helper.service';
import { SIGNUP } from 'src/app/shared/constants/form-validation-messages.constant';
import { AuthService } from 'src/app/core/services/auth.service';
import { UtilService } from 'src/app/shared/services/util.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  signupForm: FormGroup;
  // name: FormControl;
  email: FormControl;
  password: FormControl;

  formError: any = {
    // name: '',
    email: '',
    password: ''
  };

  validationMessages: any = SIGNUP;

  signupInProgress = false;

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
    // this.name = new FormControl('', [
    //   Validators.required
    // ]);

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
    this.signupForm = new FormGroup({
      // name: this.name,
      email: this.email,
      password: this.password
    });
    this.signupForm.valueChanges.subscribe(data => this.onFormValueChanges());
  }

  onFormValueChanges() {
    this.formError = this.formHelperService
      .prepareValidationMessage(this.signupForm, this.validationMessages, this.formError);
  }

  resetForm() {
    this.signupForm.reset();
    this.formError = {
      email: '',
      password: ''
    };
  }

  async signup() {
    try {
      this.signupInProgress = true;
      const result = await this.firebaseAuthService.registerWithEmailAndPassword(this.email.value, this.password.value);
      this.utilService.presentToast('Account created 🎉', 'Verification email sent! Please verify.', 4000, 'success');
      this.signupInProgress = false;
      this.resetForm();
      this.router.navigate(['/login']);
    } catch (error) {
      this.signupInProgress = false;
      this.utilService.presentToast('Oops 😰', error.message, 2000, 'danger');
    }
  }

}
