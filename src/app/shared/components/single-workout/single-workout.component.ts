import { Component, OnInit, OnDestroy } from '@angular/core';
import {  AlertController, ModalController, Platform } from '@ionic/angular';
import { Excersise } from '../../interfaces/workout/exercise';
import { emptySingleSet, singleWorkoutModes } from './singleWorkoutHelper';
import { TimerComponent } from './timer/timer.component';
import { Store, select } from '@ngrx/store';
import { actions, Reducers } from 'src/app/store';
import { Workout } from '../../interfaces/workout/workout';
import { ActivatedRoute, Router } from '@angular/router';
import { ActiveWorkoutService } from 'src/app/features/workouts/active-workout/services/active-workout.service';
import { HistoryService } from 'src/app/features/workouts/history/services/history.service';
import * as storeState from 'src/app/shared/interfaces/store/index';
import { MyWorkoutService } from 'src/app/features/workouts/my-workouts/services/my-workout.service';

@Component({
  selector: 'app-single-workout',
  templateUrl: './single-workout.component.html',
  styleUrls: ['./single-workout.component.scss'],
})
export class SingleWorkoutComponent implements OnInit {
  public currentWorkout: Workout;
  public workoutMode: string;
  public modes = singleWorkoutModes;
  public activeIndex: number;
  public isItemDeleted: boolean;
  public deviceHeight = 0;
  private selectedWorkoutId: string;

  constructor(public alertController: AlertController,
              public modalController: ModalController,
              private store: Store<Reducers>,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private activeWorkoutService: ActiveWorkoutService,
              private historyService: HistoryService,
              private platform: Platform,
              private myWorkoutService: MyWorkoutService) { }

  ngOnInit() {
    this.loadViewHeight();
    this.store.pipe(select('singleWorkout')).subscribe((state: storeState.WorkoutState) => {
      if (state.trainingMode === this.modes.training ) {
        if (this.activeWorkoutService.getTrainingType === true) {
          this.currentWorkout = {
            title: state.currentWorkout.title,
            excercises: [...state.currentWorkout.excercises],
            startTime: state.currentWorkout.startTime,
            author: state.currentWorkout.author,
            _id: state.currentWorkout._id,
            trainingDate: state.currentWorkout.trainingDate
          };
          this.selectedWorkoutId = this.currentWorkout._id;
        }
      } else {
        this.currentWorkout = state.trainingMode === this.modes.history ? state.historyWorkout : state.workoutToShow;
        this.activeIndex = +this.activatedRoute.snapshot.paramMap.get('workoutIndex');
      }
      this.workoutMode = state.trainingMode;
    });
  }

   private loadViewHeight() {
    this.platform.ready().then((readySource) => {
      this.deviceHeight = this.platform.height() - 56;
    });
  }

  public saveWorkoutState() {
    if (!this.isItemDeleted) {
      if (this.workoutMode === this.modes.trainingList) {
        this.store.dispatch(actions.myWorkoutActions.updateWorkoutListElement({
          index: this.activeIndex,
          workoutListItem: this.currentWorkout
        }));
      }
    }
    const subscription = this.store.pipe(select('myWorkouts')).subscribe((state: storeState.MyWorkoutState) => {
      this.myWorkoutService.saveUserWorkouts(state.workoutsList || []);
    });
    subscription.unsubscribe();
    this.saveWorkoutInTrainingMode();
  }

  private saveWorkoutInTrainingMode() {
    if (this.workoutMode === this.modes.training)  {
      this.store.dispatch(actions.singleWorkoutActions.startWorkout({
        workoutStartingTemplate: this.currentWorkout
      }));
    }
  }

  public doReorder(ev: any) {
    const from = ev.detail.from;
    const to = ev.detail.to;
    const movedElement = this.currentWorkout.excercises[from];
    this.currentWorkout.excercises.splice(from, 1);
    this.currentWorkout.excercises.splice(to, 0, movedElement);
    this.saveWorkoutInTrainingMode();
    ev.detail.complete();
  }

  public deleteExercise(excerciseIndex: number) {
    this.currentWorkout.excercises.splice(excerciseIndex, 1);
    this.saveWorkoutInTrainingMode();
  }

  public addSingleSet(excercise: Excersise) {
    excercise.series.push({...emptySingleSet});
  }

  public deleteSingleSet(excercise: Excersise, singleSetIndex: number) {
    excercise.series.splice(singleSetIndex, 1);
  }

  public cloneSingleSet(excercise: Excersise, singleSetIndex: number) {
    excercise.series.push({
      repeats: excercise.series[singleSetIndex].repeats,
      weight: excercise.series[singleSetIndex].weight,
    });
  }

  public async changeExerciseName(exercise: Excersise) {
    const alert = await this.alertController.create({
      header: 'Podaj nazwę ćwiczenia',
      inputs: [
        {
          name: 'newExerciseName',
          type: 'text',
          value: exercise.name
        }
      ],
      buttons: [
        {
          text: 'Anuluj',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Ok',
          handler: (data) => {
            const newExerciseName = data.newExerciseName;
            if (newExerciseName) {
              exercise.name = newExerciseName;
            }

          }
        }
      ]
    });
    await alert.present();
  }

  public async openTimer() {
    const modal = await this.modalController.create({
      component: TimerComponent
    });
    return await modal.present();
  }

  public async addExercise() {
    const alert = await this.alertController.create({
      header: 'Podaj nazwę ćwiczenia',
      inputs: [
        {
          name: 'newExerciseTitle',
          type: 'text',
          placeholder: `Ćwiczenie ${this.currentWorkout.excercises.length + 1}`
        }
      ],
      buttons: [
        {
          text: 'Anuluj',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Ok',
          handler: (data) => {
            const newExerciseTitle = data.newExerciseTitle;
            if (newExerciseTitle) {
              this.currentWorkout.excercises.push({
                name: newExerciseTitle,
                breakTime: 45,
                series: [{
                  ...emptySingleSet
                }]
              });
            }
            this.saveWorkoutInTrainingMode();
          }
        }
      ]
    });
    await alert.present();
  }

  public async finishWorkout() {
    const alert = await this.alertController.create({
      header: 'Czy napewno chcesz zakończyć trening?',
      inputs: [
        {
          name: 'shouldSaveTraining',
          type: 'checkbox',
          label: !!this.selectedWorkoutId ? 'Aktualizuj listę treningów' : 'Dodaj do listy treningów',
          value: 'Zapisz trening'
        }
      ],
      buttons: [
        {
          text: 'Anuluj',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Tak',
          handler: (data) => {
            const shouldSaveTraining = !!data[0];
            this.currentWorkout.excercises.forEach(exercise => {
              exercise.series.forEach(singleSeries => {
                if (!singleSeries.repeats) {
                  singleSeries.repeats = 0;
                }
                if (!singleSeries.weight) {
                  singleSeries.weight = 0;
                }
              });
            });
            this.activeWorkoutService.finishTraining(this.currentWorkout, shouldSaveTraining, this.selectedWorkoutId).subscribe(result => {
              if (shouldSaveTraining) {
                this.store.dispatch(actions.myWorkoutActions.addWorkoutListElement({workoutsListItem: this.currentWorkout,
                   selectedWorkoutId: this.selectedWorkoutId}));
                this.saveWorkoutState();
              }
              this.activeWorkoutService.setIfTrainingSelected(false);
              this.router.navigate(['workouts-history']);
              this.store.dispatch(actions.historyActions.addToHistory({workout: this.currentWorkout}));
              this.store.dispatch(actions.singleWorkoutActions.finishWorkout({}));
              this.currentWorkout = undefined;
              }
            );
            }
          }
      ]
    });
    await alert.present();
  }

  public removeWorkout() {
    this.store.dispatch(actions.myWorkoutActions.removeWorkoutListElement({
      index: this.activeIndex
    }));
    this.isItemDeleted = true;
    this.saveWorkoutState();
    this.router.navigate(['my-workouts']);
  }

  public removeWorkoutFromHistory() {
    this.store.dispatch(actions.historyActions.removeWorkout({
      workoutIndex: this.activeIndex
    }));
    this.historyService.removeWorkoutFromHistory(this.currentWorkout).subscribe(res => {});
    this.router.navigate(['workouts-history']);
  }

  public titleChanged() {
    this.saveWorkoutInTrainingMode();
  }

}
