import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CoachUserComponent } from './coach-user/coach-user.component';
import { NormalUserComponent } from './normal-user/normal-user.component';
import { TrainingsComponent  } from './profile-tab-components/trainings/trainings.component';
import { AchivmentsComponent } from './profile-tab-components/achivments/achivments.component';
import { FriendsComponent } from './profile-tab-components/friends/friends.component';
import { SettingsComponent } from './profile-tab-components/settings/settings.component';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/app/shared/shared.module';
import { IonicImageLoader } from 'ionic-image-loader';

const routes: Routes = [
  {
    path: 'normal',
    component: NormalUserComponent,
    children:  [
      {path: 'friends', component: FriendsComponent},
      {path: 'trainings', component: TrainingsComponent},
      {path: 'achivment', component: AchivmentsComponent},
      {path: 'settings', component: SettingsComponent}
    ]
  },
  {
    path: 'coach', 
    component: CoachUserComponent
  },

];

@NgModule({
  declarations: [
    CoachUserComponent,
    NormalUserComponent,
    FriendsComponent,
    AchivmentsComponent,
    TrainingsComponent,
    SettingsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    IonicModule,
    SharedModule,
    IonicImageLoader
  ]
})
export class UserModule { }
