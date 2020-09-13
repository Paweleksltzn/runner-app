import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserSearcherResponse } from 'src/app/shared/interfaces/searcher/playerSearcherResponse';
import { UserProfile } from 'src/app/shared/interfaces/profile/userInterface';
import { Store } from '@ngrx/store';
import { Reducers, actions } from 'src/app/store';
import { User } from 'src/app/shared/interfaces/auth/User';
import { Socket } from 'ngx-socket-io';
import { socketEvents } from 'src/app/shared/entitys/sockets-events';
import { Workout } from 'src/app/shared/interfaces/workout/workout';
import { Achievment } from 'src/app/shared/interfaces/profile/achievment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient,
              private store: Store<Reducers>,
              private socket: Socket) {
                this.subscribeOnFriendDeletion();
  }

  public addFriend(newFriend: UserSearcherResponse): Observable<any> {
    return this.http.post(`${environment.srvAddress}/${environment.endpoints.user}/addFriend`, newFriend);
  }

  public removeFriend(deletedFriendId: string): Observable<any> {
    return this.http.delete(`${environment.srvAddress}/${environment.endpoints.user}/deleteFriend/${deletedFriendId}`);
  }

  public confirmFriendInvitation(newFriendAcc: User): Observable<any> {
    return this.http.post(`${environment.srvAddress}/${environment.endpoints.user}/confirmFriendInvitation`, { newFriendAcc });
  }

  public rejectFriendInvitation(rejectedFriendAcc: User): Observable<any> {
    return this.http.post(`${environment.srvAddress}/${environment.endpoints.user}/rejectFriendInvitation`, { rejectedFriendAcc });
  }

  public changeGradient(newGradient: number): Observable<any> {
    return this.http.post(`${environment.srvAddress}/${environment.endpoints.user}/changeGradient`, { newGradient });
  }

  public changeDescription(newDescription: string): Observable<any> {
    return this.http.post(`${environment.srvAddress}/${environment.endpoints.user}/changeDescription`, { newDescription });
  }

  public changeProfileImage(profileImageData: FormData): Observable<any> {
    return this.http.post(`${environment.srvAddress}/${environment.endpoints.user}/changeProfileImage`, profileImageData);
  }

  public getFriendsForUserProfile(userProfile: UserProfile): Observable<any> {
    const queryParams = {
      params: {
        userProfileId: userProfile._id
      }
    };
    return this.http.get(`${environment.srvAddress}/${environment.endpoints.user}/getFriendsForUserProfile`, queryParams);
  }
  
  public deleteProfilePhoto(): Observable<any> {
    return this.http.delete(`${environment.srvAddress}/${environment.endpoints.user}/deleteProfileImage`);
  }

  public getFriendSearcherResponse(searchString: string, limit: number, offset: number): Observable<UserProfile[]> {
    const queryParams = {
        params: {
          searchString,
          limit: limit.toString(),
          offset: offset.toString()
        }
    };
    return this.http.get<UserProfile[]>(`${environment.srvAddress}/${environment.endpoints.searcher}/friends`, queryParams);
  }

  private subscribeOnFriendDeletion() {
    this.socket.fromEvent(socketEvents.friendDeletion).subscribe((oldFriendId: string) => {
      this.store.dispatch(actions.profileAction.removeFriend({removedFriendId: oldFriendId}));
    });
  }

}
