import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CoachUserComponent } from './coach-user/coach-user.component';
import { NormalUserComponent } from './normal-user/normal-user.component';
import { TrainingsComponent  } from './profile-tab-components/trainings/trainings.component';
import { AchivmentsComponent } from './profile-tab-components/achivments/achivments.component';
import { FriendsComponent } from './profile-tab-components/friends/friends.component';
import { SettingsComponent } from './profile-tab-components/settings/settings.component';
import { RatingComponent } from './profile-tab-components/rating/rating.component';
import { NormalUserForGuestComponent } from './normal-user/normal-user-for-guest/normal-user-for-guest.component';
import { CoachUserForGuestComponent } from './coach-user/coach-user-for-guest/coach-user-for-guest.component';
import { RatingGuestComponent } from './profile-tab-components/rating/rating-guest/rating-guest.component';

import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/app/shared/shared.module';
import { IonicImageLoader } from 'ionic-image-loader';
import { StoreModule } from '@ngrx/store';
import { profileReducer } from './profile-tab-components/settings/settings.reducer';

const routes: Routes = [
  {
    path: 'normal',
    component: NormalUserComponent,
    children:  [
      {path: 'friends', component: FriendsComponent},
      {path: 'achivment', component: AchivmentsComponent},
      {path: 'settings', component: SettingsComponent}
    ]
  },
  {
    path: 'coach', 
    component: CoachUserComponent,
    children:  [
      {path: 'friends', component: FriendsComponent},
      {path: 'settings', component: SettingsComponent},
      {path: 'rate', component: RatingComponent}
    ]
  },
  {path: 'normal-guest',
  component: NormalUserForGuestComponent,
  children: [
    {path: 'friends', component: FriendsComponent},
    {path: 'trainings', component: TrainingsComponent},
    {path: 'achivment', component: AchivmentsComponent}
  ]
  },
  {path: 'coach-guest',
  component: CoachUserForGuestComponent,
  children: [
    {path: 'friends', component: FriendsComponent},
    {path: 'rate-guest' , component: RatingGuestComponent}
  ]
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
    RatingComponent,
    NormalUserForGuestComponent,
    CoachUserForGuestComponent,
    RatingGuestComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    IonicModule,
    SharedModule,
    IonicImageLoader,
    StoreModule.forFeature('profile',  profileReducer )
  ]
})
export class UserModule { }
