import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, Resolve, ActivatedRoute } from '@angular/router';
import { DbService } from 'src/app/shared/services/db.service';

@Injectable({
  providedIn: 'root'
})
export class TodoResolver implements Resolve<any> {
  constructor(
      private router: Router,
      private dbService: DbService,
      private activatedRoute: ActivatedRoute
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.router.getCurrentNavigation().extras.state) {
        return this.router.getCurrentNavigation().extras.state.todoInfo;
    } else {
        const todoId = route.paramMap.get('id');
        return this.dbService.getTodo(todoId);
    }
  }
}
