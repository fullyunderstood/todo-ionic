import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { DbService } from 'src/app/shared/services/db.service';
import { Observable } from 'rxjs';
import { UtilService } from 'src/app/shared/services/util.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.page.html',
  styleUrls: ['./todos.page.scss'],
})
export class TodosPage implements OnInit {

  todos$: Observable<any>;

  constructor(
    public afAuth: AngularFireAuth,
    private router: Router,
    private firebaseDbService: DbService,
    private utilService: UtilService
  ) { }

  ngOnInit() {
    this.todos$ = this.firebaseDbService.getTodos();
  }

  addTodo() {
    this.router.navigate(['/main/create-todo']);
  }

  async deleteTodo(todoId: string) {
    try {
      await this.utilService.presentLoading();
      await this.firebaseDbService.deleteTodo(todoId);
      await this.utilService.dismissLoading();
    } catch (error) {
      await this.utilService.dismissLoading();
      this.utilService.presentToast('Oops', error.message, 1000, 'success');
    }
  }

  openTodo(todoId: string, todoInformation: any) {
    this.router.navigate(['/main/todo', todoId], { state: { todoInfo: todoInformation }});
  }
}
