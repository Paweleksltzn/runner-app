import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CoachUserComponent } from './coach-user/coach-user.component';
import { NormalUserComponent } from './normal-user/normal-user.component';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [
  {path: 'normal', component: NormalUserComponent},
  {path: 'coach', component: CoachUserComponent}
];

@NgModule({
  declarations: [
    CoachUserComponent,
    NormalUserComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    IonicModule,
    SharedModule
  ]
})
export class UserModule { }
