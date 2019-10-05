import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { AgmCoreModule } from '@agm/core';
import { IonicModule } from '@ionic/angular';

import { TrainingPage } from './training.page';
import { TrainingStatisticsComponent } from 'src/app/features/training/components/training.statistics/training.statistics.component';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { StoreModule } from '@ngrx/store';
import { trainingReducer } from './store/training.reducer';
import { TrainingTypeComponent } from './components/training-type/training-type.component';

const routes: Routes = [
  {
    path: '',
    component: TrainingPage
  },
  {
    path: 'type',
    component: TrainingTypeComponent
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
  declarations: [TrainingPage, TrainingStatisticsComponent, TrainingTypeComponent],
  entryComponents: [TrainingStatisticsComponent],
  providers: [
    Geolocation
  ]
})
export class TrainingPageModule {}
