import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private http: HttpClient) { }

  public confirmMail(confirmToken: string): Observable<string>{
    return this.http.post<string>(`${environment.srvAddress}/${environment.endpoints.auth}/emailConfirmed`, { confirmToken });
  }
}
