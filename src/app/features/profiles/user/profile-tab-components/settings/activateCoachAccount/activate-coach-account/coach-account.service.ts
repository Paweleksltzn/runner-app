import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CoachAccountService {

  constructor(private http: HttpClient) { }

  public setCoach(): Observable<any> {
    return this.http.put(`${environment.srvAddress}/${environment.endpoints.trainer}/setTrainer`, {});
  }

  public rateCoach(rate: number, trainerId: string): Observable<any> {
    return this.http.post(`${environment.srvAddress}/${environment.endpoints.trainer}/rateCoach`, {rate, trainerId});
  }

}
