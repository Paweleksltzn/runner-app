import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { PasswordResetData } from './pass-change.component';

@Injectable({
  providedIn: 'root'
})
export class PasswordService {

  constructor(private http: HttpClient) { }
  public changedPassword(newPassword: PasswordResetData): Observable<PasswordResetData>{
    return this.http.post<PasswordResetData>('http://localhost:3000/api/auth/password/reset/attempt', newPassword);
  }
}
