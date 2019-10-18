import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Token } from './email-confirm.component';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private emailConfirm: HttpClient) { }

  confirmMail(token: Token): Observable<Token>{
    return this.emailConfirm.post<Token>('http://localhost:3000/api/auth/emailConfirmed', token);
  }
}
