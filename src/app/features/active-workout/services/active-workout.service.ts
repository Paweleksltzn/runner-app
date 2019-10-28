import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ActiveWorkoutService {
  private isTrainingTypeSelected = false;

  constructor() { }

  public startTraining() {
    this.isTrainingTypeSelected = true;
  }

  public finishTraining() {
    this.isTrainingTypeSelected = false;
  }

  public get getTrainingType() {
    return this.isTrainingTypeSelected;
  }

}
