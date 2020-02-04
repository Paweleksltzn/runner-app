import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Store, select } from '@ngrx/store';
import { Reducers } from 'src/app/store';
import { Workout } from 'src/app/shared/interfaces/workout/workout';
import * as storeState from 'src/app/shared/interfaces/store/index';
import { UserProfile } from 'src/app/shared/interfaces/profile/userInterface';
import { workoutShareTypes, workoutShareTypesArr } from './workoutShareTypes';
import { ToastGeneratorService } from 'src/app/shared/services/toast-generator.service';

@Component({
  selector: 'app-workout-share',
  templateUrl: './workout-share.component.html',
  styleUrls: ['./workout-share.component.scss'],
})
export class WorkoutShareComponent implements OnInit {
  public workoutsList: Workout[];
  public friends: UserProfile[] = [];
  public workoutShareTypesArr = workoutShareTypesArr;
  private transferTarget: UserProfile;
  private selectedWorkoutsIndexes: number[] = [];
  private shareType: string;

  constructor(private modalController: ModalController,
              private store: Store<Reducers>,
              private toastGeneratorService: ToastGeneratorService) { }

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

  public workoutsSelected(event: any) {
    this.selectedWorkoutsIndexes = event.detail.value;
  }

  public selectReceiver(event: any) {
    this.transferTarget = this.friends[event.detail.value];
  }

  public selectShareType(event: any) {
    this.shareType = event.detail.value;
  }

  public confirmShare() {
    if (this.checkSelectsValue()) {
      switch (this.shareType) {
        case workoutShareTypes.free: {
          break;
        }
        case workoutShareTypes.pay: {
          break;
        }  
          
      }
    }
  }

  private checkSelectsValue(): boolean {
    if (this.selectedWorkoutsIndexes.length > 0 && this.friends.length > 0 && this.shareType) {
      return true;
    } else {
      this.toastGeneratorService.presentToast(`Uzupełnij dane poprawnie, nie zostawiaj pustych pól`, 'danger');
      return false;
    }
  }

}
