import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Store, select } from '@ngrx/store';
import { Reducers } from 'src/app/store';
import { Workout } from 'src/app/shared/interfaces/workout/workout';
import * as storeState from 'src/app/shared/interfaces/store/index';
import { UserProfile } from 'src/app/shared/interfaces/profile/userInterface';
import { workoutShareTypes, workoutShareTypesArr } from './workoutShareTypes';
import { ToastGeneratorService } from 'src/app/shared/services/toast-generator.service';
import { UserService } from 'src/app/features/profiles/user/services/user.service';
import { MyWorkoutService } from '../../my-workouts/services/my-workout.service';

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
  private shareType = workoutShareTypes.free;

  constructor(private modalController: ModalController,
              private store: Store<Reducers>,
              private toastGeneratorService: ToastGeneratorService,
              private myWorkoutService: MyWorkoutService) { }

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
      const workoutsToShare = this.workoutsList.filter((workout, index) => {
        return this.selectedWorkoutsIndexes.includes(index);
      });
      this.myWorkoutService.shareWorkoutsWithFriend('free', this.transferTarget._id, workoutsToShare).subscribe(res => {
        this.toastGeneratorService.presentToast(`Trening został udostępniony poprawnie`, 'success');
        this.modalController.dismiss();
      }, err => {
        this.toastGeneratorService.presentToast(`Nie udało się udostępnić treningu`, 'danger');
      });
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
