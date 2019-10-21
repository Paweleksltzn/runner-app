import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserRegistrationData } from '../../../shared/interfaces/auth/registrationData';
import { environment } from '../../../../environments/environment';
import { UserLoginData } from '../../../shared/interfaces/auth/userLogIn';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Router } from '@angular/router';
import * as jwt_decode from "jwt-decode";
import { actions } from '../../../store';
import { Store } from '@ngrx/store';
import { AuthState } from '../../../shared/interfaces/auth/AuthState';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public token: string;

  constructor(private http: HttpClient, private nativeStorage: NativeStorage, private router: Router, private store: Store<{auth: AuthState}>) { }

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
    this.router.navigate(['training']);
  }

  public signOut() {
    this.store.dispatch(actions.authActions.signOut({}));
    this.router.navigate(['auth','login']);
  }

  public autoLogin() {
    this.nativeStorage.getItem('credentials').then(
    data => {
      if (data.email && data.password) {
        this.postLogIn(data).pipe(take(1)).subscribe((userToken:string) => {
          this.signIn(userToken)
        });
      }
    },
    error => {
      this.router.navigate(['auth', 'login']);
    }
  );
  }

  public getToken(): string {
    return this.token;
  }

}
