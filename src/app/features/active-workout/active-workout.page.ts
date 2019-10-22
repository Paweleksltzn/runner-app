import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { WorkoutState } from 'src/app/shared/interfaces/workout/WorkoutState';
import { actions } from 'src/app/store';
import { singleWorkoutModes } from 'src/app/shared/components/single-workout/singleWorkoutHelper';
import { ModalController } from '@ionic/angular';
import { ActiveWorkoutSelectorComponent } from './active-workout-selector/active-workout-selector.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-active-workout',
  templateUrl: './active-workout.page.html',
  styleUrls: ['./active-workout.page.scss'],
})
export class ActiveWorkoutPage implements OnInit {

  constructor(private store: Store<{singleWorkout: WorkoutState}>, private router: Router) { }

  ngOnInit() {
    // zapisywac do store sekunde rozpoczecia treningu, oraz date treningu przy pierwszej inicjacji ( wybranie typu treningu)
    this.showTrainingSelector();
    this.store.dispatch(actions.singleWorkoutActions.changeTrainingMode({ newTrainingMode: singleWorkoutModes.training}));
  }

  public showTrainingSelector() {

  }

}
