import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from '../../../../../../../environments/environment';
import { Observable } from 'rxjs';
import { PlayerSearcherResponse } from '../../../../../../shared/interfaces/searcher/playerSearcherResponse';

@Injectable({
  providedIn: 'root'
})
export class AddFriendService {

  constructor(private http: HttpClient) { }


  public getPalyerSearcherResponse(searchString: string): Observable<PlayerSearcherResponse> {
    const queryParams = {
        params: {
          searchString
        }
    };
    return this.http.get<PlayerSearcherResponse>(`${environment.srvAddress}/${environment.endpoints.searcher}/players`, queryParams);
  }
}
