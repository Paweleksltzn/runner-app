import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrainingsComponent  } from '../profile-tab-components/trainings/trainings.component';
import { AchivmentsComponent } from '../profile-tab-components/achivments/achivments.component';
import { FriendsComponent } from '../profile-tab-components/friends/friends.component';
import { SettingsComponent } from '../profile-tab-components/settings/settings.component';
import { RatingGuestComponent } from '../profile-tab-components/rating/rating-guest/rating-guest.component';
import { Routes, RouterModule} from '@angular/router';
import { ProfileComponent } from '../../user_param/profile/profile.component';

const routes: Routes = [
  {path: '', component: ProfileComponent,
  children: [
    {path: '', component: FriendsComponent,outlet: 'router1'},
    {path: 'trainings', component: TrainingsComponent},
    {path: '', component: AchivmentsComponent,outlet: 'router2'},
    {path: 'rate-guest' , component: RatingGuestComponent},
    {path: 'settings', component: SettingsComponent}
  ]
  },

];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class UserRoutingModule {}
