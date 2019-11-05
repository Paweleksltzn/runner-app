import { Component, OnInit, ViewChild } from '@angular/core';
import { HistoryService } from './services/history.service';
import { Workout } from 'src/app/shared/interfaces/workout/workout';
import { IonInfiniteScroll } from '@ionic/angular';
import { Router } from '@angular/router';
import { singleWorkoutModes } from 'src/app/shared/components/single-workout/singleWorkoutHelper';
import { actions } from 'src/app/store';
import { Store } from '@ngrx/store';
import { WorkoutState } from 'src/app/shared/interfaces/workout/WorkoutState';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {
  public workoutsHistory: Workout[] = [];

  @ViewChild(IonInfiniteScroll, {static: false}) infiniteScroll: IonInfiniteScroll;

  constructor(private historyService: HistoryService, private router: Router,
              private store: Store<{singleWorkout: WorkoutState}>) { }

  ngOnInit() {
    this.historyService.getUserHistory().subscribe((response: any) => {
      this.workoutsHistory =  response.workoutsHistory;
    });
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
