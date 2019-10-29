import { Component, OnInit } from '@angular/core';
import { actions } from 'src/app/store';
import { singleWorkoutModes } from 'src/app/shared/components/single-workout/singleWorkoutHelper';
import { Store, select } from '@ngrx/store';
import { WorkoutState } from 'src/app/shared/interfaces/workout/WorkoutState';
import { MyWorkoutState } from 'src/app/shared/interfaces/my-workouts/myWorkoutState';
import { MyWorkoutService } from '../services/my-workout.service';
import { Subscription } from 'rxjs';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-my-workout',
  templateUrl: './my-workout.component.html',
  styleUrls: ['./my-workout.component.scss'],
})
export class MyWorkoutComponent implements OnInit {

  constructor(private store: Store<{singleWorkout: WorkoutState}>, private myWorkoutsService: MyWorkoutService,
              private navController: NavController) { }

  ngOnInit() {}

  ionViewWillEnter() {
    this.store.dispatch(actions.singleWorkoutActions.changeTrainingMode({ newTrainingMode: singleWorkoutModes.trainingList}));
  }

  ionViewWillLeave() {
    const storeSubscription: Subscription = this.store.pipe(select('myWorkouts')).subscribe((state: MyWorkoutState) => {
      if (state.workoutsList) {
        this.myWorkoutsService.saveUserWorkouts(state.workoutsList);
      }
    });
    storeSubscription.unsubscribe();
  }

}
