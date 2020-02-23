import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserRegistrationData } from '../../../shared/interfaces/auth/registrationData';
import { environment } from '../../../../environments/environment';
import { UserLoginData } from '../../../shared/interfaces/auth/userLogIn';
import { Router } from '@angular/router';
import * as jwt_decode from 'jwt-decode';
import { actions, Reducers } from '../../../store';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { StorageService } from 'src/app/shared/services/storage.service';
import * as storageNames from 'src/app/shared/entitys/storageNames';
import { LoginResponse } from 'src/app/shared/interfaces/auth/loginResponse';
import { NotificationsService } from 'src/app/features/notifications/services/notifications.service';
import { Notification } from 'src/app/shared/interfaces/notifications/notification';
import { Socket } from 'ngx-socket-io';
import { socketEvents } from 'src/app/shared/entitys/sockets-events';
import { UserProfile } from 'src/app/shared/interfaces/profile/userInterface';
import { ConversationService } from 'src/app/features/profiles/user_param/chat/services/conversation.service';
import { Conversation } from 'src/app/shared/interfaces/conversation/conversation';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public token: string;

  constructor(private http: HttpClient,
              private storageService: StorageService,
              private router: Router,
              private store: Store<Reducers>,
              private notificationsService: NotificationsService,
              private socket: Socket,
              private conversationsService: ConversationService,
              ) {
                this.socket.fromEvent(socketEvents.connect).subscribe((newFriend: UserProfile) => {
                  if (this.token) {
                    this.postSocketId(this.socket.ioSocket.id).subscribe(res => {});
                  }
                  this.subscribeNewFriend();
                  this.subscribeNewFriendInvitation();
                  this.subscribeNewFriendRejection();
                });
              }

  public changePassword() {
    return this.http.put(`${environment.srvAddress}/${environment.endpoints.auth}/password/reset`, {});
  }

  public postSignUp(userData: UserRegistrationData) {
    return this.http.post(`${environment.srvAddress}/${environment.endpoints.auth}/signup`, userData);
  }

  public postLogIn(loginData: UserLoginData) {
    return this.http.post(`${environment.srvAddress}/${environment.endpoints.auth}/login`, loginData);
  }

  public postAutoLogIn(authToken: string) {
    return this.http.post(`${environment.srvAddress}/${environment.endpoints.auth}/autoLogin`, { authToken });
  }

  public postSocketId(socketId: string) {
    return this.http.post(`${environment.srvAddress}/${environment.endpoints.socket}/socketRoom`, {socketId});
  }

  public signIn(token: string) {
    const decodedToken =  jwt_decode(token);
    this.token = token;
    this.store.dispatch(actions.authActions.signIn({
      ...decodedToken.data
    }));
    this.postSocketId(this.socket.ioSocket.id).subscribe(res => {});
    this.notificationsService.getNotifications().subscribe((notifications: Notification[]) => {
      this.store.dispatch(actions.notificationActions.loadNotifications({ notifications }));
      this.router.navigate(['my-workouts']);
      this.getConversations();
      this.subscribeNotifications();
  });
  }

  public signOut() {
    this.store.dispatch(actions.authActions.signOut({}));
    this.storageService.setItem(storageNames.authenticationToken, '');
  }

  public async autoLogin() {
    const authenticationToken = await this.storageService.getItem(storageNames.authenticationToken);
    if (authenticationToken.value) {
      this.postAutoLogIn(authenticationToken.value).pipe(take(1)).subscribe((res: LoginResponse) => {
        this.signIn(res.token);
        this.store.dispatch(actions.profileAction.loadOwnerProfile({userProfile: res.userProfile, friends: res.friends}));
      },
      err => {
        this.storageService.setItem(storageNames.authenticationToken, '');
        this.navigateToLoginPage();
      });
    } else {
      this.navigateToLoginPage();
    }
  }

  public getToken(): string {
    return this.token;
  }

  private navigateToLoginPage() {
    this.router.navigate(['auth', 'login']);
  }

  private getConversations() {
    this.conversationsService.getConversations().subscribe((conversations: Conversation[]) => {
      this.store.dispatch(actions.conversationActions.loadConversations({ conversations }));
    });
  }

  private subscribeNotifications() {
    this.socket.fromEvent(socketEvents.newNotification).subscribe((newNotification: Notification) => {
      this.store.dispatch(actions.notificationActions.addNotification({ newNotification }));
    });
  }

  private subscribeNewFriend() {
    this.socket.fromEvent(socketEvents.newFriend).subscribe((newFriend: UserProfile) => {
      this.store.dispatch(actions.profileAction.addFriend({ newFriend }));
    });
  }

  private subscribeNewFriendInvitation() {
    this.socket.fromEvent(socketEvents.newFriendInvitation).subscribe((invitatingFriend: UserProfile) => {
      this.store.dispatch(actions.profileAction.newInvitation({ invitatingFriend }));
    });
  }

  private subscribeNewFriendRejection() {
    this.socket.fromEvent(socketEvents.newFriendRejection).subscribe((rejectingProfile: UserProfile) => {
      this.store.dispatch(actions.profileAction.invitationRejected({ rejectingProfile }));
    });
  }

}
