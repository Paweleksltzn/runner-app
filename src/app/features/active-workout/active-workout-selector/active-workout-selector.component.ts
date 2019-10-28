import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { MyWorkoutState } from 'src/app/shared/interfaces/my-workouts/myWorkoutState';
import { Workout } from 'src/app/shared/interfaces/workout/workout';
import { WorkoutState } from 'src/app/shared/interfaces/workout/WorkoutState';
import { actions } from 'src/app/store';
import { Router } from '@angular/router';
import { ActiveWorkoutService } from '../services/active-workout.service';

@Component({
  selector: 'app-active-workout-selector',
  templateUrl: './active-workout-selector.component.html',
  styleUrls: ['./active-workout-selector.component.scss'],
})
export class ActiveWorkoutSelectorComponent implements OnInit {
  public workoutsList: Workout[];
  public selectedWorkout: Workout;
  public workoutTitle = '';

  constructor(private store: Store<{myWorkouts: MyWorkoutState, singleWorkout: WorkoutState}>,
              private router: Router, private activeWorkoutService: ActiveWorkoutService) { }

  ngOnInit() {
    this.store.pipe(select('myWorkouts')).subscribe((state: MyWorkoutState) => {
      this.workoutsList = state.workoutsList || [];
    });
  }

  public calcSeriesAmount(myWorkout: Workout) {
    return myWorkout.excercises.reduce((acc, element) => acc + element.series.length, 0);
  }

  public optionSelected(event: any) {
    const optionIndex = event.detail.value;
    if (optionIndex >= 0) {
      this.selectedWorkout = this.workoutsList[optionIndex];
      this.workoutTitle = this.selectedWorkout.title;
    } else {
      this.selectedWorkout = undefined;
      this.workoutTitle = '';
    }
  }

  public startTraining() {
    if (!this.selectedWorkout) {
      this.setDefaultTrainingTemplate();
    }
    this.selectedWorkout.title = this.workoutTitle || 'Nowy trening';
    this.selectedWorkout.trainingDate = new Date('dd-mm-yyyy');
    this.selectedWorkout.startTime = Date.now();
    this.activeWorkoutService.startTraining();
    this.store.dispatch(actions.singleWorkoutActions.startWorkout({ workoutStartingTemplate: this.selectedWorkout}));
    this.router.navigate(['/workout']);
  }

  private setDefaultTrainingTemplate() {
    this.selectedWorkout = {
      title: 'nowy trening',
      excercises: []
    };
  }

}
