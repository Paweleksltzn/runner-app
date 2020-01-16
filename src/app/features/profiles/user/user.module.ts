import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/app/shared/shared.module';
import { IonicImageLoader } from 'ionic-image-loader';
import { StoreModule } from '@ngrx/store';
import { profileReducer } from './store/settings.reducer';
import { UserRoutingModule } from './user-routing/user-routing.module';
import { FriendsComponent } from './profile-tab-components/friends/friends.component';
import { AchivmentsComponent } from './profile-tab-components/achivments/achivments.component';
import { TrainingsComponent } from './profile-tab-components/trainings/trainings.component';
import { SettingsComponent } from './profile-tab-components/settings/settings.component';
import { RatingComponent } from './profile-tab-components/rating/rating.component';
import { RatingGuestComponent } from './profile-tab-components/rating/rating-guest/rating-guest.component';
import { ProfileComponent } from '../user_param/profile/profile.component';
import { AddFriendsComponent } from './profile-tab-components/friends/add-friends/add-friends.component';
import { ChatModule } from '../user_param/chat/chat/chat.module';
import { ActivateCoachAccountComponent } from '../user/profile-tab-components/settings/activateCoachAccount/activate-coach-account/activate-coach-account.component';
import { ImageCropperComponent } from '../user_param/image-cropper/image-cropper.component';
import { ImageCropperModule } from 'ngx-image-cropper';

@NgModule({
  declarations: [
    FriendsComponent,
    AchivmentsComponent,
    TrainingsComponent,
    SettingsComponent,
    RatingComponent,
    RatingGuestComponent,
    ProfileComponent,
    AddFriendsComponent,
    ActivateCoachAccountComponent,
    ImageCropperComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    SharedModule,
    IonicImageLoader,
    StoreModule.forFeature('profile',  profileReducer ),
    UserRoutingModule,
    ChatModule,
    ImageCropperModule
  ],
  entryComponents: [
    AddFriendsComponent,
    ActivateCoachAccountComponent,
    ImageCropperComponent
  ]
})

export class UserModule { }
