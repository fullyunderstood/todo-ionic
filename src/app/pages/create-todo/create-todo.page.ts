import { CREATE_TODO } from './../../shared/constants/form-validation-messages.constant';
import { Router } from '@angular/router';
import { DbService } from './../../shared/services/db.service';
import { Component, OnInit } from '@angular/core';
import { UtilService } from 'src/app/shared/services/util.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormHelperService } from 'src/app/shared/services/form-helper.service';

@Component({
  selector: 'app-create-todo',
  templateUrl: './create-todo.page.html',
  styleUrls: ['./create-todo.page.scss'],
})
export class CreateTodoPage implements OnInit {

  createTodoForm: FormGroup;

  name: FormControl;
  description: FormControl;
  dueDate: FormControl;

  todoCreationInProgress = false;

  formError = {
    name: ''
  };

  validationMessages = CREATE_TODO;

  constructor(
    private firebaseDbService: DbService,
    private router: Router,
    private utilService: UtilService,
    private formHeleperService: FormHelperService
  ) { }

  ngOnInit() {
    this.createFormControl();
    this.createForm();
  }

  createFormControl() {
    this.name = new FormControl('', [
      Validators.required
    ]);

    this.description = new FormControl('');

    this.dueDate = new FormControl('');
  }

  createForm() {
    this.createTodoForm = new FormGroup({
      name: this.name,
      description: this.description,
      dueDate: this.dueDate
    });
    this.createTodoForm.valueChanges.subscribe(() => this.onFormValueChange());
  }

  onFormValueChange() {
    this.formError = this.formHeleperService.prepareValidationMessage(this.createTodoForm, this.validationMessages, this.formError);
  }

  resetForm() {
    this.createTodoForm.reset();
    this.formError = {
      name: ''
    };
  }

  async createTodo() {
    try {
      this.todoCreationInProgress = true;
      await this.firebaseDbService.createTodo({
        name: this.name.value,
        description: this.description.value,
        date: this.dueDate.value,
        createdAt: new Date()
      });
      this.resetForm();
      this.router.navigate(['/main/todos']);
      this.utilService.presentToast('New Todo Created', '', 500, 'success');
      this.todoCreationInProgress = false;
    } catch (error) {
      this.utilService.presentToast('Oops', error.message, 500, 'danger');
      this.todoCreationInProgress = false;
      throw new Error(error);
    }
  }

  resetStates() {
    this.resetForm();
  }
}
