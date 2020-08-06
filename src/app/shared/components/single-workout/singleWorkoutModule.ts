import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, AlertController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../modules/material.module';
import { SingleWorkoutComponent } from './single-workout.component';
import { TimerComponent } from './timer/timer.component';
import { StoreModule } from '@ngrx/store';
import { singleWorkoutReducer } from './store/single-workout-reducer';
import { HeaderComponent } from '../header/header.component';
import { MenuComponent } from '../menu/menu.component';
import { MenuButtonComponent } from '../menu-button/menu-button.component';

@NgModule({
  declarations: [SingleWorkoutComponent, TimerComponent, HeaderComponent, MenuComponent, MenuButtonComponent],
  imports: [
    CommonModule,
    IonicModule,
    MaterialModule,
    FormsModule,
    StoreModule.forFeature('singleWorkout', singleWorkoutReducer)
  ],
  exports: [
    SingleWorkoutComponent,
    HeaderComponent,
    MenuComponent,
    MenuButtonComponent
  ],
  providers: [
    AlertController
  ],
  entryComponents: [TimerComponent]
})
export class SingleWorkoutModule { }
