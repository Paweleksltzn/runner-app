import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { Notification } from 'src/app/shared/interfaces/notifications/notification';
import { Store } from '@ngrx/store';
import { Reducers, actions } from 'src/app/store';

@Component({
  selector: 'app-single-notification',
  templateUrl: './single-notification.component.html',
  styleUrls: ['./single-notification.component.scss'],
})
export class SingleNotificationComponent implements OnInit {
  public notification: Notification;
  private currentIndex: number;
  constructor(private navParams: NavParams, private modalController: ModalController, public store: Store<Reducers>) { }

  ngOnInit() {
    this.notification = ({ ...this.navParams.data }) as Notification;
    this.currentIndex = this.navParams.get('index');
  }

  public removeNotification() {
    this.store.dispatch(actions.notificationActions.removeNotification({ index: this.currentIndex }));
    this.closeModal();
  }

  public async closeModal() {
    this.modalController.dismiss();
  }

}
