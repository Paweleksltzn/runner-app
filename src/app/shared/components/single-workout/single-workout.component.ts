import { Component, OnInit } from '@angular/core';
import {  AlertController } from '@ionic/angular';
import { testWorkout } from './testWorkoutData';
import { Excersise } from '../../interfaces/workout/exercise';
import { emptySingleSet } from './singleWorkoutHelper';

@Component({
  selector: 'app-single-workout',
  templateUrl: './single-workout.component.html',
  styleUrls: ['./single-workout.component.scss'],
})
export class SingleWorkoutComponent implements OnInit {
  public currentWorkout = testWorkout;
  constructor(public alertController: AlertController) { }

  ngOnInit() {}

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

}
