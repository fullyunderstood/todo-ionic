import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { DbService } from 'src/app/shared/services/db.service';
import { Observable } from 'rxjs';
import { TodoService } from 'src/app/shared/services/todo.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserData } from 'src/app/shared/models/auth.model';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.page.html',
  styleUrls: ['./todos.page.scss'],
})
export class TodosPage implements OnInit {

  activeTodos$: Observable<any>;
  currentUser: UserData;

  constructor(
    public afAuth: AngularFireAuth,
    private router: Router,
    private firebaseDbService: DbService,
    public todoService: TodoService,
    private firebaseAuthService: AuthService
  ) { }

  ngOnInit() {
    this.activeTodos$ = this.firebaseDbService.getActiveTodos();
    const { displayName, email } = this.firebaseAuthService.getCurrentUser();
    this.currentUser = {
      displayName,
      email
    };
  }

  createTodo() {
    this.router.navigate(['/main/create-todo']);
  }

  openTodo(todoId: string, todoInformation: any) {
    this.router.navigate(['/main/todo', todoId], { state: { todoInfo: todoInformation }});
  }
}
