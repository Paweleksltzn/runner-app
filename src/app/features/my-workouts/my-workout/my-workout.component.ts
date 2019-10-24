import { Component, OnInit } from '@angular/core';
import { actions } from 'src/app/store';
import { singleWorkoutModes } from 'src/app/shared/components/single-workout/singleWorkoutHelper';
import { Store } from '@ngrx/store';
import { WorkoutState } from 'src/app/shared/interfaces/workout/WorkoutState';

@Component({
  selector: 'app-my-workout',
  templateUrl: './my-workout.component.html',
  styleUrls: ['./my-workout.component.scss'],
})
export class MyWorkoutComponent implements OnInit {

  constructor(private store: Store<{singleWorkout: WorkoutState}>) { }

  ngOnInit() {}

  ionViewWillEnter() {
    this.store.dispatch(actions.singleWorkoutActions.changeTrainingMode({ newTrainingMode: singleWorkoutModes.trainingList}));
  }

}
