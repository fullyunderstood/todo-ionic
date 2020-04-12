import { Component, OnInit } from '@angular/core';
import { TodoService } from 'src/app/shared/services/todo.service';
import { Observable } from 'rxjs';
import { DbService } from 'src/app/shared/services/db.service';
import { UserData } from 'src/app/shared/models/auth.model';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-complete',
  templateUrl: './complete.page.html',
  styleUrls: ['./complete.page.scss'],
})
export class CompletePage implements OnInit {

  completedTodos$: Observable<any>;
  currentUser: UserData;

  constructor(
    private firebaseDbService: DbService,
    public todoService: TodoService,
    private firebaseAuthService: AuthService
  ) { }

  ngOnInit() {
    this.completedTodos$ = this.firebaseDbService.getCompletedTodos();
    const { displayName, email } = this.firebaseAuthService.getCurrentUser();
    this.currentUser = {
      displayName,
      email
    };
  }

}
