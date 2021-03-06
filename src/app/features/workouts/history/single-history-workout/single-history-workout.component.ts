import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { actions, Reducers } from 'src/app/store';
import { singleWorkoutModes } from 'src/app/shared/components/single-workout/singleWorkoutHelper';

@Component({
  selector: 'app-single-history-workout',
  templateUrl: './single-history-workout.component.html',
  styleUrls: ['./single-history-workout.component.scss'],
})
export class SingleHistoryWorkoutComponent implements OnInit {

  constructor(private store: Store<Reducers>) { }

  ngOnInit() {}

  ionViewWillEnter() {
    this.store.dispatch(actions.singleWorkoutActions.changeTrainingMode({ newTrainingMode: singleWorkoutModes.history}));
  }

}
