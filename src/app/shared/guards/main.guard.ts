import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class MainGuard implements CanActivate {

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
              return true;
            } else {
              this.router.navigate(['/login']);
              return false;
            }
          })
        );
    }
}
