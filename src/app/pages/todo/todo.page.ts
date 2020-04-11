import { Component, OnInit } from '@angular/core';
import { DbService } from 'src/app/shared/services/db.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UtilService } from 'src/app/shared/services/util.service';
import { FormHelperService } from 'src/app/shared/services/form-helper.service';
import { CREATE_TODO } from 'src/app/shared/constants/form-validation-messages.constant';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.page.html',
  styleUrls: ['./todo.page.scss'],
})
export class TodoPage implements OnInit {

  editTodoForm: FormGroup;

  name: FormControl;
  description: FormControl;
  dueDate: FormControl;

  inEditMode = false;
  todoSaveInProgress = false;

  formError = {
    name: ''
  };

  validationMessages = CREATE_TODO;

  todoInfo: any;

  constructor(
    private firebaseDbService: DbService,
    private router: Router,
    private utilService: UtilService,
    private formHeleperService: FormHelperService,
    private activatedRoute: ActivatedRoute
  ) { }

  async ngOnInit() {
    this.activatedRoute.data.subscribe(data => {
        this.todoInfo = data.todoInfo;
        this.createFormControl();
        this.createForm();
    });
  }

  createFormControl() {
    this.name = new FormControl(this.todoInfo.name, [
      Validators.required
    ]);

    this.description = new FormControl(this.todoInfo.description);

    this.dueDate = new FormControl(this.todoInfo.date);
  }

  createForm() {
    this.editTodoForm = new FormGroup({
      name: this.name,
      description: this.description,
      dueDate: this.dueDate
    });
    this.editTodoForm.valueChanges.subscribe(() => this.onFormValueChange());
  }

  onFormValueChange() {
    this.formError = this.formHeleperService.prepareValidationMessage(this.editTodoForm, this.validationMessages, this.formError);
  }

  resetForm() {
    this.editTodoForm.reset();
    this.formError = {
      name: ''
    };
    this.inEditMode = false;
  }

  async saveTodo() {
    try {
      this.todoSaveInProgress = true;
      await this.firebaseDbService.saveTodo(this.todoInfo.id, {
        name: this.name.value,
        description: this.description.value,
        date: this.dueDate.value
      });
      this.resetForm();
      this.router.navigate(['/main/todos']);
      this.utilService.presentToast('Todo Updated', '', null, 'success');
      this.todoSaveInProgress = false;
    } catch (error) {
      this.utilService.presentToast('Oops', error.message, null, 'danger');
      this.todoSaveInProgress = false;
      throw new Error(error);
    }
  }

  resetStates() {
    this.resetForm();
  }

  goToEditMode() {
    this.inEditMode = true;
  }

  cancelEdit() {
    this.inEditMode = false;
  }

}
