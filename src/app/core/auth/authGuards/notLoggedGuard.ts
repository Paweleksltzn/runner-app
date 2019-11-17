import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Reducers } from '../../../store/index';

@Injectable({
  providedIn: 'root'
})
export class NotLoggedGuard implements CanActivate {

  constructor(private store: Store<Reducers>, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      let isUserNotLoggedIn: boolean;
      this.store.pipe(select('auth')).subscribe(result => {
        isUserNotLoggedIn = !!result.accessLevel;
        if (isUserNotLoggedIn) {
          this.router.navigate(['/training']);
        }
      });
      return !isUserNotLoggedIn;
  }
}
