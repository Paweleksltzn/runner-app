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


  public getPalyerSearcherResponse(searchString: string): Observable<UserSearcherResponse[]>{
    const queryParams = {
        params: {
          searchString
        } 
    };
    return this.http.get<UserSearcherResponse[]>(`${environment.srvAddress}/${environment.endpoints.searcher}/players`, queryParams);
  }
}
