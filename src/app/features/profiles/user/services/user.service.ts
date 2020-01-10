import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserSearcherResponse } from 'src/app/shared/interfaces/searcher/playerSearcherResponse';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  public addFriend(newFriend: UserSearcherResponse): Observable<any> {
    return this.http.post(`${environment.srvAddress}/${environment.endpoints.user}/addFriend`, newFriend);
  }

}
