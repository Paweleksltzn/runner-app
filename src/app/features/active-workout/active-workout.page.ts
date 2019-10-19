import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { WorkoutState } from 'src/app/shared/interfaces/workout/WorkoutState';
import { actions } from 'src/app/store';
import { singleWorkoutModes } from 'src/app/shared/components/single-workout/singleWorkoutHelper';

@Component({
  selector: 'app-active-workout',
  templateUrl: './active-workout.page.html',
  styleUrls: ['./active-workout.page.scss'],
})
export class ActiveWorkoutPage implements OnInit {

  constructor(private store: Store<{singleWorkout: WorkoutState}>) { }

  ngOnInit() {
    // zapisywac do store sekunde rozpoczecia treningu, oraz date treningu przy pierwszej inicjacji ( wybranie typu treningu)
    this.store.dispatch(actions.singleWorkoutActions.changeTrainingMode({ newTrainingMode: singleWorkoutModes.training}));
  }

}
