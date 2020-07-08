import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { actions, Reducers } from 'src/app/store';
import { singleWorkoutModes } from 'src/app/shared/components/single-workout/singleWorkoutHelper';
import { Workout } from 'src/app/shared/interfaces/workout/workout';
import { AlertController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { MyWorkoutService } from './services/my-workout.service';
import * as storeState from 'src/app/shared/interfaces/store/index';
import { WorkoutShareComponent } from '../components/workout-share/workout-share.component';
import { User } from 'src/app/shared/interfaces/auth/User';
import { Plugins } from '@capacitor/core';


@Component({
  selector: 'app-my-workouts',
  templateUrl: './my-workouts.page.html',
  styleUrls: ['./my-workouts.page.scss'],
})
export class MyWorkoutsPage implements OnInit {
  public myWorkouts: Workout[] = [];
  private currentUserId: string;

  constructor(private store: Store<Reducers>,
              private alertController: AlertController,
              private router: Router,
              private myWorkoutService: MyWorkoutService,
              private modalController: ModalController) { }

  ngOnInit() {
    this.myWorkoutService.loadUserWorkoutsToStore();
    this.store.pipe(select('myWorkouts')).subscribe((state: storeState.MyWorkoutState) => {
      this.myWorkouts = state.workoutsList || [];
    });
    this.store.pipe(select('auth')).subscribe((state: storeState.AuthState) => {
      this.currentUserId = state._id;
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
                creationDate: new Date(),
                author: this.currentUserId,
                excercises: []
              };
              this.store.dispatch(actions.myWorkoutActions.addWorkoutListElement({
                workoutsListItem: newTraining
              }));
            }
            this.saveMyWorkoutsStage();
          }
        }
      ]
    });
    await alert.present();
  }

  public async shareWorkouts() {
    const conversationModal = await this.modalController.create({
      component: WorkoutShareComponent
    });
    return await conversationModal.present();
  }

}
