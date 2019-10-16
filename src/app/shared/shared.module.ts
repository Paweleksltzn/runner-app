import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { TabsNavComponent } from './components/tabs-nav/tabs-nav.component';
import { SingleWorkoutComponent } from './components/single-workout/single-workout.component';
import { MaterialModule } from './modules/material.module';

@NgModule({
  declarations: [TabsNavComponent, SingleWorkoutComponent],
  imports: [
    CommonModule,
    IonicModule,
    MaterialModule
  ],
  exports: [
    TabsNavComponent,
    SingleWorkoutComponent
  ]
})
export class SharedModule { }
