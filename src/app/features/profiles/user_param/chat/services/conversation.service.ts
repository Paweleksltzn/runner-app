import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Socket } from 'ngx-socket-io';
import { socketEvents } from 'src/app/shared/entitys/sockets-events';
import { Conversation } from 'src/app/shared/interfaces/conversation/conversation';
import { Store, select } from '@ngrx/store';
import { actions, Reducers } from '../../../../../store';
import { LocalNotificationsGeneratorService } from 'src/app/shared/services/local-notifications-generator.service';
import * as storeState from 'src/app/shared/interfaces/store/index';
@Injectable({
  providedIn: 'root'
})
export class ConversationService {

  constructor(private http: HttpClient,
              private socket: Socket,
              private store: Store<Reducers>,
              private localNotificationsGeneratorService: LocalNotificationsGeneratorService
              ) {
                this.subscribeNewConversation();
                this.subscribeNewMessage();
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
      this.createLocalNotificationForMessage(conversation);
    });
  }

  private subscribeNewMessage() {
    this.socket.fromEvent(socketEvents.newMessage).subscribe((conversation: Conversation) => {
      this.store.dispatch(actions.conversationActions.getMessage({ conversation }));
      this.createLocalNotificationForMessage(conversation);
    });
  }

  private createLocalNotificationForMessage(conversation: Conversation) {
    let ownerEmail = '';
    this.store.pipe(select('profile')).subscribe((state: storeState.ProfileState) => {
      ownerEmail = state.ownerEmail;
    });
    const first60Letters = conversation.messages[conversation.messages.length - 1].content.substr(0, 60);
    const notificationMessage = first60Letters.length === 60 ? `${first60Letters}...` : first60Letters;
    let author = '';
    conversation.members.forEach(member => {
      if (member.userProfile.email !== ownerEmail) {
        author = `${member.userProfile.name} ${member.userProfile.surname}`;
      }
    });
    this.localNotificationsGeneratorService.
    createSimpleNotification(author, notificationMessage);
  }

}
