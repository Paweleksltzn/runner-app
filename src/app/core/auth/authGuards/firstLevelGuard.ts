import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Reducers } from '../../../store/index';

@Injectable({
  providedIn: 'root'
})
export class FirstLevelGuard implements CanActivate {

  constructor(private store: Store<Reducers>, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      let isUserLoggedIn: boolean;
      this.store.pipe(select('auth')).subscribe(result => {
        isUserLoggedIn = !!result.accessLevel;
        if (!isUserLoggedIn) {
          this.router.navigate(['/auth/login']);
        }
      });
      return isUserLoggedIn;
  }
}
