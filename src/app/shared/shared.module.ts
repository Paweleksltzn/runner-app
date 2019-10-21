import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, AlertController } from '@ionic/angular';
import { TabsNavComponent } from './components/tabs-nav/tabs-nav.component';
import { MaterialModule } from './modules/material.module';
import { FormsModule } from '@angular/forms';
import { SingleWorkoutModule } from './components/single-workout/singleWorkoutModule';

@NgModule({
  declarations: [TabsNavComponent],
  imports: [
    CommonModule,
    IonicModule,
    MaterialModule,
    FormsModule,
    SingleWorkoutModule
  ],
  exports: [
    TabsNavComponent,
    SingleWorkoutModule
  ],
  providers: [
    AlertController
  ]
})
export class SharedModule { }
