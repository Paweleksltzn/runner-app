import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, AlertController, ToastController } from '@ionic/angular';
import { MaterialModule } from './modules/material.module';
import { FormsModule } from '@angular/forms';
import { SingleWorkoutModule } from './components/single-workout/singleWorkoutModule';
import { ToastGeneratorService } from './services/toast-generator.service';
import { StorageService } from './services/storage.service';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { InputCharsGuardDirective } from './directives/input-chars-guard.directive';

@NgModule({
  declarations: [InputCharsGuardDirective, InputCharsGuardDirective],
  imports: [
    CommonModule,
    IonicModule,
    MaterialModule,
    FormsModule,
    SingleWorkoutModule
  ],
  exports: [
    SingleWorkoutModule,
    InputCharsGuardDirective
  ],
  providers: [
    AlertController,
    ToastGeneratorService,
    ToastController,
    StorageService,
    LocalNotifications
  ]
})
export class SharedModule { }
