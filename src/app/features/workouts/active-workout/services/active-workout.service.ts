import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Workout } from 'src/app/shared/interfaces/workout/workout';

@Injectable({
  providedIn: 'root'
})
export class ActiveWorkoutService {
  private isTrainingTypeSelected = false;

  constructor(private http: HttpClient) { }

  public startTraining() {
    this.isTrainingTypeSelected = true;
  }

  public finishTraining(finishedWorkout: Workout, shouldSave: boolean, selectedWorkoutId: string) {
    return this.http.post(`${environment.srvAddress}/${environment.endpoints.workout}/history/add`,
     { workout: finishedWorkout, shouldSave, selectedWorkoutId });
  }

  public setIfTrainingSelected(isSelected: boolean) {
    this.isTrainingTypeSelected = isSelected;
  }

  public get getTrainingType() {
    return this.isTrainingTypeSelected;
  }

}
