import { Component, OnInit, OnDestroy } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TrainingTime } from 'src/app/shared/interfaces/trainingTime';
import { Subscription, interval } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { actions } from 'src/app/store';
import { WorkoutState } from 'src/app/shared/interfaces/workout/WorkoutState';
import { TouchSequence } from 'selenium-webdriver';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
})
export class TimerComponent implements OnInit {
  public trainingTime: TrainingTime;
  public shouldStartTimer: boolean;
  public timerSubscription: Subscription;

  constructor(private modalCtrl: ModalController, private store: Store<{singleWorkout: WorkoutState}>) { }

  ngOnInit() {
    this.store.pipe(select('singleWorkout')).subscribe((state: WorkoutState) => {
      this.timerSubscription = state.timerSubscription;
      this.trainingTime = state.trainingTime;
      this.shouldStartTimer = state.isTimerOn;
    });
  }

  public cancel() {
    this.modalCtrl.dismiss();
  }

  private runTimer(): void {
    if (!this.shouldStartTimer) {
      this.store.dispatch(actions.singleWorkoutActions.toggleTimer({}));
    }
    let minutes = this.trainingTime.minutes;
    let seconds = this.trainingTime.seconds;
    if (!minutes) { minutes = '0'; }
    if (!seconds) { seconds = '0'; }
    const timerSubscription = interval(1000).subscribe((data) => {
      seconds = `${ +seconds + 1 }`;
      if (+seconds === 60) {
        minutes = `${ +minutes + 1 }`;
        seconds = '0';
      }
      if (seconds.length < 2) {
        seconds = `0${ seconds }`;
      }
      if (minutes.length < 2) {
        minutes = `0${ minutes }`;
      }
      this.store.dispatch(actions.singleWorkoutActions.trainingSecondPassed({ seconds, minutes }));
    });
    this.store.dispatch(actions.singleWorkoutActions.subscribeTimer({ timerSubscription }));
  }

  public reset() {
    this.store.dispatch(actions.singleWorkoutActions.resetTimer({}));
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
      this.store.dispatch(actions.singleWorkoutActions.unsubscribeTimer({ }));
      this.runTimer();
    }
  }

  public pause() {
    this.timerSubscription.unsubscribe();
    this.store.dispatch(actions.singleWorkoutActions.unsubscribeTimer({ }));
    this.store.dispatch(actions.singleWorkoutActions.toggleTimer({}));
  }

}
