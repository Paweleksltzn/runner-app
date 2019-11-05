import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  constructor(private http: HttpClient) { }

  public getUserHistory() {
    return this.http.get(`${environment.srvAddress}/${environment.endpoints.workout}/history/all`);
  }

}
