import { Component, OnInit, Input } from '@angular/core';
import { WorkoutShareNotification } from 'src/app/shared/interfaces/notifications/workoutShareNotification';
import { Workout } from 'src/app/shared/interfaces/workout/workout';
import { MyWorkoutService } from 'src/app/features/workouts/my-workouts/services/my-workout.service';
import { Store } from '@ngrx/store';
import { actions, Reducers } from 'src/app/store';
import * as storeState from 'src/app/shared/interfaces/store/index';
import { ModalController } from '@ionic/angular';
import { ToastGeneratorService } from 'src/app/shared/services/toast-generator.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-workout-share-notification',
  templateUrl: './workout-share-notification.component.html',
  styleUrls: ['./workout-share-notification.component.scss'],
})
export class WorkoutShareNotificationComponent implements OnInit {
  @Input() sharedWorkoutNotification: WorkoutShareNotification;
  @Input() notificationIndex: number;

  constructor(private myWorkoutService: MyWorkoutService,
              private store: Store<Reducers>,
              private modalController: ModalController,
              private toastGeneratorService: ToastGeneratorService,
              private router: Router) { }

  ngOnInit() {}

  public calcSeriesAmount(myWorkout: Workout) {
    return myWorkout.excercises.reduce((acc, element) => acc + element.series.length, 0);
  }

  public acceptWorkoutShare() {
    this.myWorkoutService.acceptWorkoutShare
    ('free', this.sharedWorkoutNotification.sharedWorkoutsList, this.sharedWorkoutNotification.author._id).subscribe(res => {
      this.store.dispatch(actions.notificationActions.removeNotification({index: this.notificationIndex}));
      this.sharedWorkoutNotification.sharedWorkoutsList.forEach((workout: Workout) => {
        this.store.dispatch(actions.myWorkoutActions.addWorkoutListElement({
          workoutsListItem: workout
        }));
      });
      this.toastGeneratorService.presentToast(`Trening został udostępniony poprawnie`, 'success');
      this.modalController.dismiss();
      this.router.navigate(['my-workouts']);
    }, err => {
      this.toastGeneratorService.presentToast(`Nie udało się udostępnić treningu`, 'danger');
    });

  }
}
