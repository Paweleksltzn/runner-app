import { Component, OnInit } from '@angular/core';
import { actions, Reducers } from 'src/app/store';
import { singleWorkoutModes } from 'src/app/shared/components/single-workout/singleWorkoutHelper';
import { Store } from '@ngrx/store';
import { MyWorkoutService } from '../services/my-workout.service';
import { Subscription } from 'rxjs';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-my-workout',
  templateUrl: './my-workout.component.html',
  styleUrls: ['./my-workout.component.scss'],
})
export class MyWorkoutComponent implements OnInit {

  constructor(private store: Store<Reducers>) { }

  ngOnInit() {}

  ionViewWillEnter() {
    this.store.dispatch(actions.singleWorkoutActions.changeTrainingMode({ newTrainingMode: singleWorkoutModes.trainingList}));
  }

}
