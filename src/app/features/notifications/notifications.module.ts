import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { NotificationsPage } from './notifications.page';
import { NotificationsService } from './services/notifications.service';
import { SingleNotificationComponent } from './components/single-notification/single-notification.component';
import { StoreModule } from '@ngrx/store';
import { notificationsReducer } from './store/notifications.reducer';
// tslint:disable-next-line: max-line-length
import { FriendsInvitationComponent } from './components/single-notification/notifications-components/friends-invitation/friends-invitation.component';
// tslint:disable-next-line: max-line-length
import { FriendsInvitationResponseComponent } from './components/single-notification/notifications-components/friends-invitation-response/friends-invitation-response.component';
import { InfoComponent } from './components/single-notification/notifications-components/info/info.component';
// tslint:disable-next-line: max-line-length
import { WorkoutShareNotificationComponent } from './components/single-notification/notifications-components/workout-share-notification/workout-share-notification.component';
import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: NotificationsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('notifications', notificationsReducer)
  ],
  declarations: [NotificationsPage,
                 SingleNotificationComponent,
                 FriendsInvitationComponent,
                 FriendsInvitationResponseComponent,
                 InfoComponent,
                 WorkoutShareNotificationComponent
  ],
  entryComponents: [SingleNotificationComponent],
  providers: [NotificationsService]
})
export class NotificationsPageModule {}
