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
import { RatingGuestComponent } from './profile-tab-components/rating/rating-guest/rating-guest.component';
import { ProfileComponent } from '../user_param/profile/profile.component';
import { AddFriendsComponent } from './profile-tab-components/friends/add-friends/add-friends.component';
import { ChatModule } from '../user_param/chat/chat/chat.module';
import { NotificationsPageModule } from '../../notifications/notifications.module'
import { ImageCropperComponent } from '../user_param/image-cropper/image-cropper.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    FriendsComponent,
    AchivmentsComponent,
    TrainingsComponent,
    SettingsComponent,
    RatingGuestComponent,
    ProfileComponent,
    AddFriendsComponent,
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
    ImageCropperModule,
    FormsModule,
    NotificationsPageModule
  ],
  entryComponents: [
    AddFriendsComponent,
    ImageCropperComponent
  ]
})

export class UserModule { }
