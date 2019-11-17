import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Workout } from 'src/app/shared/interfaces/workout/workout';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  constructor(private http: HttpClient) { }

  public getUserHistory() {
    return this.http.get(`${environment.srvAddress}/${environment.endpoints.workout}/history/all`);
  }

  public removeWorkoutFromHistory(workout: Workout) {
    const params = {
      duration: workout.duration.toString(),
      title: workout.title,
      trainingDate: workout.trainingDate
    };
    return this.http.delete(`${environment.srvAddress}/${environment.endpoints.workout}/history/remove`, { params });
  }

}
