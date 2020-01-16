import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Socket } from 'ngx-socket-io';
import { socketEvents } from 'src/app/shared/entitys/sockets-events';
import { Conversation } from 'src/app/shared/interfaces/conversation/conversation';
import { Store } from '@ngrx/store';
import { actions, Reducers } from '../../../../../store';
@Injectable({
  providedIn: 'root'
})
export class ConversationService {

  constructor(private http: HttpClient,
              private socket: Socket,
              private store: Store<Reducers>
              ) {
                this.subscribeNewConversation();
              }

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

  public displayConversation(conversationId: string): Observable<any> {
    return this.http.put(`${environment.srvAddress}/${environment.endpoints.conversation}/displayConversation`, { conversationId });
  }

  private subscribeNewConversation() {
    this.socket.fromEvent(socketEvents.newConversation).subscribe((conversation: Conversation) => {
      this.store.dispatch(actions.conversationActions.addConversation({ conversation }));
    });
  }

}
