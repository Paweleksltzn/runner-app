import { Component, OnInit, ViewChild } from '@angular/core';
import { HistoryService } from './services/history.service';
import { Workout } from 'src/app/shared/interfaces/workout/workout';
import { IonInfiniteScroll } from '@ionic/angular';
import { Router } from '@angular/router';
import { singleWorkoutModes } from 'src/app/shared/components/single-workout/singleWorkoutHelper';
import { actions } from 'src/app/store';
import { Store, select } from '@ngrx/store';
import { WorkoutState } from 'src/app/shared/interfaces/workout/WorkoutState';
import { MyWorkoutState } from 'src/app/shared/interfaces/my-workouts/myWorkoutState';
import { state } from '@angular/animations';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {
  public workoutsHistory: Workout[] = [];
  public isStoreLoaded = false;

  @ViewChild(IonInfiniteScroll, {static: false}) infiniteScroll: IonInfiniteScroll;

  constructor(private historyService: HistoryService, private router: Router,
              private store: Store<{singleWorkout: WorkoutState, history: MyWorkoutState}>) { }

  ngOnInit() {
    // tslint:disable-next-line: no-shadowed-variable
    this.store.pipe(select('history')).subscribe((state: MyWorkoutState) => {
      this.isStoreLoaded = state.isStateLoaded;
      this.workoutsHistory = state.workoutsList;
    });
    if (!this.isStoreLoaded) {
      this.historyService.getUserHistory().subscribe((response: any) => {
        this.store.dispatch(actions.historyActions.loadHistory({workoutsHistory: response.workoutsHistory || []}));
      });
    }
  }


  public calcSeriesAmount(historyWorkout: Workout) {
    return historyWorkout.excercises.reduce((acc, element) => acc + element.series.length, 0);
  }

  public openWorkoutDetails(workout: Workout, index: number) {
    this.store.dispatch(actions.singleWorkoutActions.changeTrainingMode({newTrainingMode: singleWorkoutModes.history}));
    this.store.dispatch(actions.singleWorkoutActions.loadTrainingToHistory({newTrainingToShow: workout}));
    this.router.navigate(['workouts-history', 'singleHistoryWorkout', index]);
  }

}
