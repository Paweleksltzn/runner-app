import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserRegistrationData } from '../../../shared/interfaces/auth/registrationData';
import { environment } from '../../../../environments/environment';
import { UserLoginData } from '../../../shared/interfaces/auth/userLogIn';
import { Router } from '@angular/router';
import * as jwt_decode from 'jwt-decode';
import { actions, Reducers } from '../../../store';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { StorageService } from 'src/app/shared/services/storage.service';
import * as storageNames from 'src/app/shared/entitys/storageNames';
import { Subject } from 'rxjs';
import { LoginResponse } from 'src/app/shared/interfaces/auth/loginResponse';
import { NotificationsService } from 'src/app/features/notifications/services/notifications.service';
import { Notification } from 'src/app/shared/interfaces/notifications/notification';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public token: string;

  constructor(private http: HttpClient, private storageService: StorageService,
              private router: Router, private store: Store<Reducers>, private notificationsService: NotificationsService) { }

  public postSignUp(userData: UserRegistrationData) {
    return this.http.post(`${environment.srvAddress}/${environment.endpoints.auth}/signup`, userData);
  }

  public postLogIn(loginData: UserLoginData) {
    return this.http.post(`${environment.srvAddress}/${environment.endpoints.auth}/login`, loginData);
  }

  public signIn(token: string) {
    const decodedToken =  jwt_decode(token);
    this.token = token;
    this.store.dispatch(actions.authActions.signIn({
      ...decodedToken.data
    }));
    this.notificationsService.getNotifications().subscribe((notifications: Notification[]) => {
      this.store.dispatch(actions.notificationActions.loadNotifications({ notifications }));
      this.router.navigate(['my-workouts']);
    });
  }

  public signOut() {
    this.store.dispatch(actions.authActions.signOut({}));
    this.storageService.setObject(storageNames.credentials, {});
  }

  public async autoLogin() {
    const credentials = await this.storageService.getObject(storageNames.credentials);
    if (credentials.email && credentials.password) {
      this.postLogIn(credentials).pipe(take(1)).subscribe((res: LoginResponse) => {
        this.signIn(res.token);
        this.store.dispatch(actions.profileAction.loadOwnerProfile({userProfile: res.userProfile}));
      },
      err => {
        this.navigateToLoginPage();
      });
    } else {
      this.navigateToLoginPage();
    }
  }

  public getToken(): string {
    return this.token;
  }

  private navigateToLoginPage() {
    this.router.navigate(['auth', 'login']);
  }

}
