import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LandingGuard implements CanActivate {

  constructor(
    private firebaseAuthService: AuthService,
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.firebaseAuthService
        .getAuthState()
        .pipe(
          map(user => {
            if (user) {
              this.router.navigate(['/main/todos']);
              return false;
            } else {
              return true;
            }
          })
        );
  }

}
