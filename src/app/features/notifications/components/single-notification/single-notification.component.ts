import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { Notification } from 'src/app/shared/interfaces/notifications/notification';
import { Store } from '@ngrx/store';
import { Reducers, actions } from 'src/app/store';
import { notificationsTypes } from '../../enums/notifications-type';
import { NotificationsService } from '../../services/notifications.service';
import { forkJoin } from 'rxjs';
import { ToastGeneratorService } from 'src/app/shared/services/toast-generator.service';
import { UserService } from 'src/app/features/profiles/user/services/user.service';

@Component({
  selector: 'app-single-notification',
  templateUrl: './single-notification.component.html',
  styleUrls: ['./single-notification.component.scss'],
})
export class SingleNotificationComponent implements OnInit {
  public notification: Notification;
  public notificationTypes = notificationsTypes;
  public currentIndex: number;

  constructor(private navParams: NavParams,
              private modalController: ModalController,
              private store: Store<Reducers>,
              private notificationsService: NotificationsService,
              private userService: UserService,
              private toastGenerator: ToastGeneratorService
              ) { }

  ngOnInit() {
    this.notification = ({ ...this.navParams.data }) as Notification;
    this.currentIndex = this.navParams.get('index');
  }

  public removeNotification() {
    if (this.notification.type === notificationsTypes.friendInvitation) {
      this.removeNotificationAndFriendInvitation();
    } else {
      this.notificationsService.removeNotification(this.notification._id).subscribe(res => {});
    }
    this.store.dispatch(actions.notificationActions.removeNotification({ index: this.currentIndex }));
    this.closeModal();
  }

  public async closeModal() {
    this.modalController.dismiss();
  }

  private removeNotificationAndFriendInvitation() {
    forkJoin([this.notificationsService.removeNotification(this.notification._id),
      this.userService.rejectFriendInvitation(this.notification.author)]).subscribe(results => {
       this.toastGenerator.presentToast('Zaproszenie zostało odrzocone', 'success');
       this.store.dispatch(actions.profileAction.rejectFriend({ rejectedFriend: results[1]}));
   });
  }

}
