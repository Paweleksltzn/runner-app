import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { actions, Reducers } from 'src/app/store';
import { singleWorkoutModes } from 'src/app/shared/components/single-workout/singleWorkoutHelper';
import { Workout } from 'src/app/shared/interfaces/workout/workout';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { MyWorkoutService } from './services/my-workout.service';
import * as storeState from 'src/app/shared/interfaces/store/index';

@Component({
  selector: 'app-my-workouts',
  templateUrl: './my-workouts.page.html',
  styleUrls: ['./my-workouts.page.scss'],
})
export class MyWorkoutsPage implements OnInit {
  public myWorkouts: Workout[] = [];

  constructor(private store: Store<Reducers>, private alertController: AlertController,
              private router: Router, private myWorkoutService: MyWorkoutService) { }

  ngOnInit() {
    this.myWorkoutService.loadUserWorkoutsToStore();
    this.store.pipe(select('myWorkouts')).subscribe((state: storeState.MyWorkoutState) => {
      this.myWorkouts = state.workoutsList || [];
      this.saveMyWorkoutsStage();
    });
  }

  ionViewWillEnter() {
    this.store.dispatch(actions.singleWorkoutActions.changeTrainingMode({ newTrainingMode: singleWorkoutModes.trainingList}));
  }

  private saveMyWorkoutsStage() {
    this.myWorkoutService.saveUserWorkouts(this.myWorkouts || []);
  }

  public calcSeriesAmount(myWorkout: Workout) {
    return myWorkout.excercises.reduce((acc, element) => acc + element.series.length, 0);
  }

  public openWorkoutDetails(workout: Workout, index: number) {
    this.store.dispatch(actions.singleWorkoutActions.changeTrainingMode({newTrainingMode: singleWorkoutModes.trainingList}));
    this.store.dispatch(actions.singleWorkoutActions.loadTrainingToShow({newTrainingToShow: workout}));
    this.router.navigate(['my-workouts', 'singleWorkout', index]);
  }

  public async addNewWorkout() {
    const alert = await this.alertController.create({
      header: 'Podaj nazwę ćwiczenia',
      inputs: [
        {
          name: 'newExerciseName',
          type: 'text',
          placeholder: `Trening ${this.myWorkouts.length + 1}`
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
              const newTraining: Workout = {
                title: newExerciseName,
                excercises: []
              };
              this.store.dispatch(actions.myWorkoutActions.addWorkoutListElement({
                workoutsListItem: newTraining
              }));
            }

          }
        }
      ]
    });
    await alert.present();
  }

}
