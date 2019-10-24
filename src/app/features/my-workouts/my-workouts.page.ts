import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { actions } from 'src/app/store';
import { WorkoutState } from 'src/app/shared/interfaces/workout/WorkoutState';
import { singleWorkoutModes, emptyWorkoutTemplate } from 'src/app/shared/components/single-workout/singleWorkoutHelper';
import { Workout } from 'src/app/shared/interfaces/workout/workout';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { MyWorkoutState } from 'src/app/shared/interfaces/my-workouts/myWorkoutState';
import { MyWorkoutService } from './services/my-workout.service';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-my-workouts',
  templateUrl: './my-workouts.page.html',
  styleUrls: ['./my-workouts.page.scss'],
})
export class MyWorkoutsPage implements OnInit, OnDestroy {
  public myWorkouts: Workout[] = [];
  private saverSubscription: Subscription;

  constructor(private store: Store<{singleWorkout: WorkoutState, myWorkouts: MyWorkoutState}>, private alertController: AlertController,
              private router: Router, private myWorkoutService: MyWorkoutService) { }

  ngOnInit() {
    this.myWorkoutService.loadUserWorkoutsToStore();
    this.store.pipe(select('myWorkouts')).subscribe((state: MyWorkoutState) => {
      this.myWorkouts = state.workoutsList || [];
    });
  }

  ionViewWillEnter() {
    this.store.dispatch(actions.singleWorkoutActions.changeTrainingMode({ newTrainingMode: singleWorkoutModes.trainingList}));
    this.saverSubscription = interval(1000 * 60 * 3).subscribe((data) => {
      this.saveMyWorkoutsStage();
    });
  }

  ionViewWillLeave() {
    this.saveMyWorkoutsStage();
    this.saverSubscription.unsubscribe();
  }

  ngOnDestroy() {
    this.saveMyWorkoutsStage();
    this.saverSubscription.unsubscribe();
  }

  private saveMyWorkoutsStage() {
    this.myWorkoutService.saveUserWorkouts(this.myWorkouts || []).subscribe(response => {
        // brak reakcji -> success
      }, err => {
        // todo -> toast z info co jest nie tak
      });

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
                excercises: [
                  {
                    name: 'Cwiczenie 1',
                    series: [
                      {
                        repeats: undefined,
                        weight: undefined
                      }
                    ]
                  }
                ]
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
