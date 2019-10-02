import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { AgmCoreModule } from '@agm/core';
import { IonicModule } from '@ionic/angular';

import { TrainingPage } from './training.page';
import { TrainingStatisticsComponent } from 'src/app/features/training/components/training.statistics/training.statistics.component';

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
    RouterModule.forChild(routes),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCcI_2vg4KgEFgvUVBfqshvqmxQmVlx_vk'
    })
  ],
  declarations: [TrainingPage, TrainingStatisticsComponent],
  entryComponents: [TrainingStatisticsComponent]
})
export class TrainingPageModule {}
