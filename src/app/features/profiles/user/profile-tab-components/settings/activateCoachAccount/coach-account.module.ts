import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/app/shared/shared.module';
import { IonicImageLoader } from 'ionic-image-loader';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ActivateCoachAccountComponent } from './activate-coach-account/activate-coach-account.component'

const routes: Routes = [
  {path: '', component: ActivateCoachAccountComponent}
];

@NgModule({
  declarations: [
    ActivateCoachAccountComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild(routes),
    SharedModule,
    IonicImageLoader,
    FormsModule
  ]
})

export class CoachModule { }
