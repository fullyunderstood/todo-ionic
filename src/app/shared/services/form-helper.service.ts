import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormHelperService {

  constructor() { }

  prepareValidationMessage(form: FormGroup, validationMessages: any, formFields: any) {
    // tslint:disable-next-line: forin
    for (const field in formFields) {
      formFields[field] = '';
      const control = form.controls[field];
      if (control && control.invalid) {
        const messageObj = validationMessages[field];
        // tslint:disable-next-line: forin
        for (const key in control.errors) {
          formFields[field] = formFields[field] + messageObj[key] + ' ';
        }
      }
    }
    return formFields;
  }
}
