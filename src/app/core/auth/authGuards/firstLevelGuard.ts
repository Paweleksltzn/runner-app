import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { actions } from '../../../store/index';
import { AuthState } from '../../../shared/interfaces/auth/AuthState';

@Injectable({
  providedIn: 'root'
})
export class FirstLevelGuard implements CanActivate {

  constructor(private store: Store<{auth: AuthState}>, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      let isUserLoggedIn: boolean;
      this.store.pipe(select('auth')).subscribe(result=> {
        isUserLoggedIn = !!result.accessLevel;
        if (!isUserLoggedIn) {
          this.router.navigate(['/auth/login']);
        }        
      });
    return isUserLoggedIn;
  }
}
