import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { DbService } from 'src/app/shared/services/db.service';
import { Observable } from 'rxjs';
import { TodoService } from 'src/app/shared/services/todo.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.page.html',
  styleUrls: ['./todos.page.scss'],
})
export class TodosPage implements OnInit {

  activeTodos$: Observable<any>;

  constructor(
    public afAuth: AngularFireAuth,
    private router: Router,
    private firebaseDbService: DbService,
    public todoService: TodoService
  ) { }

  ngOnInit() {
    this.activeTodos$ = this.firebaseDbService.getActiveTodos();
  }

  createTodo() {
    this.router.navigate(['/main/create-todo']);
  }

  openTodo(todoId: string, todoInformation: any) {
    this.router.navigate(['/main/todo', todoId], { state: { todoInfo: todoInformation }});
  }
}
