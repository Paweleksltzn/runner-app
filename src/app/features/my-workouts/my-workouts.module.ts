import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MyWorkoutsPage } from './my-workouts.page';
import { MyWorkoutComponent } from './my-workout/my-workout.component';

const routes: Routes = [
  {
    path: '',
    component: MyWorkoutsPage
  },
  {
    path: 'singleWorkout',
    component: MyWorkoutComponent
  }

];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MyWorkoutsPage, MyWorkoutComponent]
})
export class MyWorkoutsPageModule {}
