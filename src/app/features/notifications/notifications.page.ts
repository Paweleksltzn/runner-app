import { Component, OnInit } from '@angular/core';
import { Notification } from 'src/app/shared/interfaces/notifications/notification';
import { ModalController } from '@ionic/angular';
import { SingleNotificationComponent } from './components/single-notification/single-notification.component';
import { Store, select } from '@ngrx/store';
import { Reducers, actions } from 'src/app/store';
import * as storeState from 'src/app/shared/interfaces/store/index';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {
  public notifications: Notification[] = [];

  constructor(public modalController: ModalController, public store: Store<Reducers>) { }

  ngOnInit() {
    this.store.pipe(select('notifications')).subscribe((state: storeState.NotificationsState) => {
      this.notifications = state.notifications;
    });
  }

  ionViewWillEnter() {
    this.store.dispatch(actions.notificationActions.displayAllNotifications({  }));
  }

  public async presentModal(notification: Notification, index: number) {
    const modal = await this.modalController.create({
      component: SingleNotificationComponent,
      componentProps: {...notification, index}
    });
    return await modal.present();
  }

}
