import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { TrainingsComponent  } from './profile-tab-components/trainings/trainings.component';
import { AchivmentsComponent } from './profile-tab-components/achivments/achivments.component';
import { FriendsComponent } from './profile-tab-components/friends/friends.component';
import { SettingsComponent } from './profile-tab-components/settings/settings.component';
import { RatingComponent } from './profile-tab-components/rating/rating.component';
import { RatingGuestComponent } from './profile-tab-components/rating/rating-guest/rating-guest.component';
import { ProfileComponent } from '../user_param/profile/profile.component';
 
import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/app/shared/shared.module';
import { IonicImageLoader } from 'ionic-image-loader';
import { StoreModule } from '@ngrx/store';
import { profileReducer } from './store/settings.reducer';

const routes: Routes = [
  {path: 'profile', component: ProfileComponent,
  children: [
    {path: 'friends', component: FriendsComponent},
    {path: 'trainings', component: TrainingsComponent},
    {path: 'achivment', component: AchivmentsComponent},
    {path: 'rate-guest' , component: RatingGuestComponent},
    {path: 'settings', component: SettingsComponent},
    {path: 'rate', component: RatingComponent}
  ]
  }

];



@NgModule({
  declarations: [
    FriendsComponent,
    AchivmentsComponent,
    TrainingsComponent,
    SettingsComponent,
    RatingComponent,
    RatingGuestComponent,
    ProfileComponent,
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
