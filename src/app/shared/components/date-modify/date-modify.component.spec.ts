import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DateModifyComponent } from './date-modify.component';

describe('DateModifyComponent', () => {
  let component: DateModifyComponent;
  let fixture: ComponentFixture<DateModifyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DateModifyComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DateModifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
