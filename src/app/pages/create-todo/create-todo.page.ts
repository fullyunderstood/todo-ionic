import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-todo',
  templateUrl: './create-todo.page.html',
  styleUrls: ['./create-todo.page.scss'],
})
export class CreateTodoPage implements OnInit {

  name = 'Sample Task';
  description = 'This is first Task\n1.vishal\n2.indu';
  dueDate = '2020-04-10T18:49:46.078+05:30';

  constructor() { }

  ngOnInit() {
  }

  createTodo() {
    console.log(this.name);
    console.log(this.description);
    console.log(this.dueDate);

  }
}
