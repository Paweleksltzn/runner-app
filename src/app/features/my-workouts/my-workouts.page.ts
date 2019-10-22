import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { actions } from 'src/app/store';
import { WorkoutState } from 'src/app/shared/interfaces/workout/WorkoutState';
import { singleWorkoutModes, emptyWorkoutTemplate } from 'src/app/shared/components/single-workout/singleWorkoutHelper';
import { Workout } from 'src/app/shared/interfaces/workout/workout';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { MyWorkoutState } from 'src/app/shared/interfaces/my-workouts/myWorkoutState';

@Component({
  selector: 'app-my-workouts',
  templateUrl: './my-workouts.page.html',
  styleUrls: ['./my-workouts.page.scss'],
})
export class MyWorkoutsPage implements OnInit, OnDestroy {
  public myWorkouts: Workout[] = [];

  constructor(private store: Store<{singleWorkout: WorkoutState, myWorkouts: MyWorkoutState}>, private alertController: AlertController,
              private router: Router) { }

  ngOnInit() {
    this.store.dispatch(actions.singleWorkoutActions.changeTrainingMode({ newTrainingMode: singleWorkoutModes.trainingList}));
    this.store.pipe(select('myWorkouts')).subscribe((state: MyWorkoutState) => {
      this.myWorkouts = state.workoutsList || [];
    });
  }

  ionViewWillLeave() {
    console.log('testt');
  }

  ngOnDestroy() {

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
