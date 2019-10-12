import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { actions } from '../../../store/index';
import { AuthState } from '../../../shared/interfaces/auth/AuthState';

@Injectable({
  providedIn: 'root'
})
export class NotLoggedGuard implements CanActivate {

  constructor(private store: Store<{auth: AuthState}>, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      let isUserNotLoggedIn: boolean;
      this.store.pipe(select('auth')).subscribe(result=> {
        isUserNotLoggedIn = !!result.accessLevel
        if (isUserNotLoggedIn) {
          this.router.navigate(['/training']);
        }        
      });
    return !isUserNotLoggedIn;
  }
}{
  
}
