import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Store, select } from '@ngrx/store';
import { Reducers } from 'src/app/store';
import { Workout } from 'src/app/shared/interfaces/workout/workout';
import * as storeState from 'src/app/shared/interfaces/store/index';
import { UserProfile } from 'src/app/shared/interfaces/profile/userInterface';

@Component({
  selector: 'app-workout-share',
  templateUrl: './workout-share.component.html',
  styleUrls: ['./workout-share.component.scss'],
})
export class WorkoutShareComponent implements OnInit {
  public workoutsList: Workout[];
  public friends: UserProfile[];

  constructor(private modalController: ModalController,
              private store: Store<Reducers>) { }

  ngOnInit() {
    this.store.pipe(select('myWorkouts')).subscribe((state: storeState.MyWorkoutState) => {
      this.workoutsList = state.workoutsList || [];
    });
    this.store.pipe(select('profile')).subscribe((state: storeState.ProfileState) => {
      this.friends = state.ownerFriends || [];
    });
  }

  public dismissModal() {
    this.modalController.dismiss();
  }

}
