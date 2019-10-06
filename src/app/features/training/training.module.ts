import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { AgmCoreModule } from '@agm/core';
import { IonicModule, LoadingController } from '@ionic/angular';

import { TrainingPage } from './training.page';
import { TrainingStatisticsComponent } from 'src/app/features/training/components/training.statistics/training.statistics.component';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { StoreModule } from '@ngrx/store';
import { trainingReducer } from './store/training.reducer';
import { BackgroundGeolocation } from '@ionic-native/background-geolocation/ngx';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';

const routes: Routes = [
  {
    path: '',
    component: TrainingPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StoreModule.forFeature('training', trainingReducer),
    RouterModule.forChild(routes),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCcI_2vg4KgEFgvUVBfqshvqmxQmVlx_vk'
    })
  ],
  declarations: [TrainingPage, TrainingStatisticsComponent],
  entryComponents: [TrainingStatisticsComponent],
  providers: [
    Geolocation,
    BackgroundMode,
    LoadingController
  ]
})
export class TrainingPageModule {}
