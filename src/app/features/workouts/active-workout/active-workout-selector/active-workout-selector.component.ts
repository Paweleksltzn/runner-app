import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { MyWorkoutState } from 'src/app/shared/interfaces/my-workouts/myWorkoutState';
import { Workout } from 'src/app/shared/interfaces/workout/workout';
import { WorkoutState } from 'src/app/shared/interfaces/workout/WorkoutState';
import { actions } from 'src/app/store';
import { Router } from '@angular/router';
import { ActiveWorkoutService } from '../services/active-workout.service';
import { singleWorkoutModes } from 'src/app/shared/components/single-workout/singleWorkoutHelper';

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

  ionViewWillEnter() {
    this.store.dispatch(actions.singleWorkoutActions.changeTrainingMode({ newTrainingMode: singleWorkoutModes.training}));
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
    this.selectedWorkout.trainingDate = this.createTrainingDate();
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

  private createTrainingDate() {
    const currentDate = new Date();
    const days = currentDate.getDate() < 10 ? `0${currentDate.getDate()}` : currentDate.getDate();
    const month =  currentDate.getMonth() + 1 < 10 ? `0${currentDate.getMonth() + 1}` : currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    return `${days}.${month}.${year}`;
  }

}
