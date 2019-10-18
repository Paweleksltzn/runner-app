import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Password } from './pass-change.component';

@Injectable({
  providedIn: 'root'
})
export class PasswordService {

  constructor(private changePassword: HttpClient) { }
  changedPassword(newPassword: Password): Observable<Password>{
    return this.changePassword.post<Password>('http://localhost:3000/api/auth/password/reset/attempt', newPassword);
  }
}
