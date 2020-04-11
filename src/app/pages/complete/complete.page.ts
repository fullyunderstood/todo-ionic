import { Component, OnInit } from '@angular/core';
import { TodoService } from 'src/app/shared/services/todo.service';
import { Observable } from 'rxjs';
import { DbService } from 'src/app/shared/services/db.service';

@Component({
  selector: 'app-complete',
  templateUrl: './complete.page.html',
  styleUrls: ['./complete.page.scss'],
})
export class CompletePage implements OnInit {

  completedTodos$: Observable<any>;

  constructor(
    private firebaseDbService: DbService,
    public todoService: TodoService
  ) { }

  ngOnInit() {
    this.completedTodos$ = this.firebaseDbService.getCompletedTodos();
  }

}
