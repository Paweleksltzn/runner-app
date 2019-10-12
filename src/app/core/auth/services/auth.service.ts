import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserRegistrationData } from '../../../shared/interfaces/auth/registrationData';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  public postSignUp(userData: UserRegistrationData) {
    return this.http.post(`${environment.srvAddress}/${environment.endpoints.auth}/signup`, userData);
  }
 
}
