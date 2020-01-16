import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { UserProfile } from 'src/app/shared/interfaces/profile/userInterface';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class ConversationService {

  constructor(private http: HttpClient,
              private socket: Socket) { }

  public getConversations(): Observable<any> {
    return this.http.get(`${environment.srvAddress}/${environment.endpoints.conversation}/all`);
  }

  public sendMessage(newMessage: string, conversationId: string): Observable<any> {
    return this.http.post(`${environment.srvAddress}/${environment.endpoints.conversation}/newMessage`, {newMessage, conversationId});
  }

  public createConversation(newMessage: string, targetProfileEmail: string): Observable<any> {
    return this.http.post(`${environment.srvAddress}/${environment.endpoints.conversation}/createConversation`,
     { targetProfileEmail, newMessage });
  }

}
