import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(private http: HttpClient) { }

  public getNotifications(): Observable<any> {
    return this.http.get(`${environment.srvAddress}/${environment.endpoints.notification}/all`);
  }

  public displayAllNotifications(): Observable<any> {
    return this.http.post(`${environment.srvAddress}/${environment.endpoints.notification}/displayAll`, {});
  }

}
