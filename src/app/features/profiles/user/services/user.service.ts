import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserSearcherResponse } from 'src/app/shared/interfaces/searcher/playerSearcherResponse';
import { UserProfile } from 'src/app/shared/interfaces/profile/userInterface';
import { Store } from '@ngrx/store';
import { Reducers, actions } from 'src/app/store';
import { User } from 'src/app/shared/interfaces/auth/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, public store: Store<Reducers>) { }

  public addFriend(newFriend: UserSearcherResponse): Observable<any> {
    return this.http.post(`${environment.srvAddress}/${environment.endpoints.user}/addFriend`, newFriend);
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

  public getFriendsForUserProfile(userProfile: UserProfile): Observable<any> {
    const queryParams = {
      params: {
        userProfileId: userProfile._id
      }
    };
    return this.http.get(`${environment.srvAddress}/${environment.endpoints.user}/getFriendsForUserProfile`, queryParams);
  }

}