import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { actions } from 'src/app/store';
import { WorkoutState } from 'src/app/shared/interfaces/workout/WorkoutState';
import { singleWorkoutModes } from 'src/app/shared/components/single-workout/singleWorkoutHelper';

@Component({
  selector: 'app-my-workouts',
  templateUrl: './my-workouts.page.html',
  styleUrls: ['./my-workouts.page.scss'],
})
export class MyWorkoutsPage implements OnInit {

  constructor(private store: Store<{singleWorkout: WorkoutState}>) { }

  ngOnInit() {
    this.store.dispatch(actions.singleWorkoutActions.changeTrainingMode({ newTrainingMode: singleWorkoutModes.trainingList}));
  }

}
