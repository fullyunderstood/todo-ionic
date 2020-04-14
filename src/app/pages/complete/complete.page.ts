import { Component, OnInit, AfterViewInit } from '@angular/core';
import { TodoService } from 'src/app/shared/services/todo.service';
import { Observable } from 'rxjs';
import { DbService } from 'src/app/shared/services/db.service';
import { UserData } from 'src/app/shared/models/auth.model';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-complete',
  templateUrl: './complete.page.html',
  styleUrls: ['./complete.page.scss'],
})
export class CompletePage implements OnInit, AfterViewInit {

  completedTodos$: Observable<any>;
  currentUser: UserData;

  constructor(
    private firebaseDbService: DbService,
    public todoService: TodoService,
    public afAuth: AngularFireAuth,
  ) { }

  ngOnInit() {
    this.completedTodos$ = this.firebaseDbService.getCompletedTodos();
  }

  ngAfterViewInit() {
    this.afAuth.user.subscribe((userData) => {
      this.currentUser = userData;
    });
  }
}
