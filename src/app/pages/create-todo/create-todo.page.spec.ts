import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreateTodoPage } from './create-todo.page';

describe('CreateTodoPage', () => {
  let component: CreateTodoPage;
  let fixture: ComponentFixture<CreateTodoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateTodoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateTodoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
