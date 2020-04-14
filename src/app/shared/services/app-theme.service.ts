import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppThemeService {

  private currentState: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public currentState$ = this.currentState.asObservable();

  constructor() { }

  changeTheme(currentState: boolean) {
    this.currentState.next(currentState);
    document.body.classList.toggle('dark', currentState);
  }
}
