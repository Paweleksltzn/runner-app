import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private http: HttpClient) { }

  public confirmMail(token: string): Observable<string>{
    return this.http.post<string>('http://localhost:3000/api/auth/emailConfirmed', token);
  }
}
