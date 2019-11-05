import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { HistoryPage } from './history.page';
import { SingleHistoryWorkoutComponent } from './single-history-workout/single-history-workout.component';
import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: HistoryPage
  },
  {
    path: 'singleHistoryWorkout/:workoutIndex',
    component: SingleHistoryWorkoutComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  declarations: [HistoryPage, SingleHistoryWorkoutComponent]
})
export class HistoryPageModule {}
