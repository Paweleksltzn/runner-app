import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { MyWorkoutsPage } from './my-workouts.page';
import { MyWorkoutComponent } from './my-workout/my-workout.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { myWorkoutReducer } from './store/my-workout-store';

const routes: Routes = [
  {
    path: '',
    component: MyWorkoutsPage
  },
  {
    path: 'singleWorkout/:workoutIndex',
    component: MyWorkoutComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    SharedModule,
    StoreModule.forFeature('myWorkouts', myWorkoutReducer)
  ],
  declarations: [MyWorkoutsPage, MyWorkoutComponent]
})
export class MyWorkoutsPageModule {}
