import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from '../../../../../../../environments/environment';
import { Observable } from 'rxjs';
import { UserSearcherResponse } from '../../../../../../shared/interfaces/searcher/playerSearcherResponse';

@Injectable({
  providedIn: 'root'
})
export class AddFriendService {

  constructor(private http: HttpClient) { }


  public getPalyerSearcherResponse(searchString: string, limit: number, offset: number): Observable<UserSearcherResponse[]> {
    const queryParams = {
        params: {
          searchString,
          limit: limit.toString(),
          offset: offset.toString()
        }
    };
    return this.http.get<UserSearcherResponse[]>(`${environment.srvAddress}/${environment.endpoints.searcher}/players`, queryParams);
  }

}
