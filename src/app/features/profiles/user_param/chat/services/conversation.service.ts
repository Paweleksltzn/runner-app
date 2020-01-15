import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ConversationService {

  constructor(private http: HttpClient) { }

  public getConversations(): Observable<any> {
    return this.http.get(`${environment.srvAddress}/${environment.endpoints.conversation}/all`);
  }

}
