import { Component, OnInit, OnDestroy } from '@angular/core';
import {  AlertController, ModalController, NavController } from '@ionic/angular';
import { Excersise } from '../../interfaces/workout/exercise';
import { emptySingleSet, singleWorkoutModes } from './singleWorkoutHelper';
import { TimerComponent } from './timer/timer.component';
import { Store, select } from '@ngrx/store';
import { WorkoutState } from '../../interfaces/workout/WorkoutState';
import { actions } from 'src/app/store';
import { Workout } from '../../interfaces/workout/workout';
import { ActivatedRoute } from '@angular/router';
import { MyWorkoutState } from '../../interfaces/my-workouts/myWorkoutState';

@Component({
  selector: 'app-single-workout',
  templateUrl: './single-workout.component.html',
  styleUrls: ['./single-workout.component.scss'],
})
export class SingleWorkoutComponent implements OnInit, OnDestroy {
  public currentWorkout: Workout;
  public workoutMode: string;
  public modes = singleWorkoutModes;
  public activeIndex: number;

  constructor(public alertController: AlertController, public modalController: ModalController,
              private store: Store<{singleWorkout: WorkoutState, myWorkouts: MyWorkoutState}>, private activatedRoute: ActivatedRoute,
              private navCtrl: NavController) { }

  ngOnInit() {
    this.store.pipe(select('singleWorkout')).subscribe((state: WorkoutState) => {
      if (state.trainingMode === this.modes.training) {
        this.currentWorkout = this.currentWorkout ? this.currentWorkout : state.currentWorkout;
      } else {
        this.currentWorkout = this.currentWorkout ? this.currentWorkout : {...state.workoutToShow};
        this.activeIndex = +this.activatedRoute.snapshot.paramMap.get('workoutIndex');
      }
      this.workoutMode = state.trainingMode;
    });
  }

  ngOnDestroy() {
    if (this.workoutMode === this.modes.trainingList) {
      this.store.dispatch(actions.myWorkoutActions.updateWorkoutListElement({
        index: this.activeIndex,
        workoutListItem: this.currentWorkout
      }));
    }
  }

  public doReorder(ev: any) {
    const from = ev.detail.from;
    const to = ev.detail.to;
    const movedElement = this.currentWorkout.excercises[from];
    this.currentWorkout.excercises.splice(from, 1);
    this.currentWorkout.excercises.splice(to, 0, movedElement);
    ev.detail.complete();
  }

  public deleteExercise(excerciseIndex: number) {
    this.currentWorkout.excercises.splice(excerciseIndex, 1);
  }

  public addSingleSet(excercise: Excersise) {
    excercise.series.push({...emptySingleSet});
  }

  public deleteSingleSet(excercise: Excersise, singleSetIndex: number) {
    excercise.series.splice(singleSetIndex, 1);
  }

  public async changeExerciseName(exercise: Excersise, accordion: any) {
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
                series: [{
                  ...emptySingleSet
                }]
              });
            }

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
          label: 'Dodaj do listy treningów',
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
            console.log(this.currentWorkout);
            // kod który konczy trening, wyslanie requesta itd
            }

          }
      ]
    });
    await alert.present();
  }

  public removeWorkout(index: number) {
    this.store.dispatch(actions.myWorkoutActions.removeWorkoutListElement({
      index: this.activeIndex
    }));
    this.navCtrl.back();
  }

}
