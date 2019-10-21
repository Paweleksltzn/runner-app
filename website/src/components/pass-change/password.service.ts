import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { PasswordResetData } from './pass-change.component';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PasswordService {

  constructor(private http: HttpClient) { }
  public changedPassword(newPassword: PasswordResetData): Observable<string>{
    return this.http.post<string>(`${environment.srvAddress}/${environment.endpoints.auth}/password/reset/attempt`, newPassword);
  }
}
