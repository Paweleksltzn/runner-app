import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ActiveWorkoutPage } from './active-workout.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { ActiveWorkoutSelectorComponent } from './active-workout-selector/active-workout-selector.component';

const routes: Routes = [
  {
    path: '',
    component: ActiveWorkoutPage
  },
  {
    path: 'selection-mode',
    component: ActiveWorkoutSelectorComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ActiveWorkoutPage, ActiveWorkoutSelectorComponent]
})
export class ActiveWorkoutPageModule {}
