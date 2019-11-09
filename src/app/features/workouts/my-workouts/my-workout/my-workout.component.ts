import { Component, OnInit, OnDestroy } from '@angular/core';
import { actions, Reducers } from 'src/app/store';
import { singleWorkoutModes } from 'src/app/shared/components/single-workout/singleWorkoutHelper';
import { Store, select } from '@ngrx/store';
import { MyWorkoutService } from '../services/my-workout.service';
import { Subscription } from 'rxjs';
import { Platform } from '@ionic/angular';
import * as storeState from 'src/app/shared/interfaces/store/index';

@Component({
  selector: 'app-my-workout',
  templateUrl: './my-workout.component.html',
  styleUrls: ['./my-workout.component.scss'],
})
export class MyWorkoutComponent implements OnInit, OnDestroy {
  private pauseSubscription: Subscription;


  constructor(private store: Store<Reducers>, private myWorkoutsService: MyWorkoutService,
              private platform: Platform) { }

  ngOnInit() {
    this.pauseSubscription = this.platform.pause.subscribe(pause => {
      this.saveWorkouts();
    });
  }

  ngOnDestroy() {
    this.pauseSubscription.unsubscribe();
  }

  ionViewWillEnter() {
    this.store.dispatch(actions.singleWorkoutActions.changeTrainingMode({ newTrainingMode: singleWorkoutModes.trainingList}));
  }

  ionViewWillLeave() {
    this.saveWorkouts();
  }


  private saveWorkouts() {
    const storeSubscription: Subscription = this.store.pipe(select('myWorkouts')).subscribe((state: storeState.MyWorkoutState) => {
      if (state.workoutsList) {
        this.myWorkoutsService.saveUserWorkouts(state.workoutsList);
      }
    });
    storeSubscription.unsubscribe();
  }

}
