import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, AlertController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../modules/material.module';
import { SingleWorkoutComponent } from './single-workout.component';
import { TimerComponent } from './timer/timer.component';
import { StoreModule } from '@ngrx/store';
import { singleWorkoutReducer } from './store/single-workout-reducer';

@NgModule({
  declarations: [SingleWorkoutComponent, TimerComponent],
  imports: [
    CommonModule,
    IonicModule,
    MaterialModule,
    FormsModule,
    StoreModule.forFeature('singleWorkout', singleWorkoutReducer)
  ],
  exports: [
    SingleWorkoutComponent
  ],
  providers: [
    AlertController
  ],
  entryComponents: [TimerComponent]
})
export class SingleWorkoutModule { }