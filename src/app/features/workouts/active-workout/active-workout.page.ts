import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { actions, Reducers } from 'src/app/store';
import { singleWorkoutModes } from 'src/app/shared/components/single-workout/singleWorkoutHelper';
import { Router } from '@angular/router';
import { MyWorkoutService } from '../my-workouts/services/my-workout.service';
import { ActiveWorkoutService } from './services/active-workout.service';

@Component({
  selector: 'app-active-workout',
  templateUrl: './active-workout.page.html',
  styleUrls: ['./active-workout.page.scss'],
})
export class ActiveWorkoutPage implements OnInit {

  constructor(private store: Store<Reducers>, private router: Router, private myWorkoutService: MyWorkoutService,
              private activeWorkoutService: ActiveWorkoutService) { }

  ngOnInit() {
    this.store.dispatch(actions.singleWorkoutActions.changeTrainingMode({ newTrainingMode: singleWorkoutModes.training}));
    this.myWorkoutService.loadUserWorkoutsToStore();
  }

  ionViewWillEnter() {
    this.store.dispatch(actions.singleWorkoutActions.changeTrainingMode({ newTrainingMode: singleWorkoutModes.training}));
    if (!this.activeWorkoutService.getTrainingType) {
      this.showTrainingSelector();
    }
  }

  public showTrainingSelector() {
    this.router.navigate(['workout/selection-mode']);
  }

}
