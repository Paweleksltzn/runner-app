import { Component, OnInit } from '@angular/core';
import { Notification } from 'src/app/shared/interfaces/notifications/notification';
import { ModalController } from '@ionic/angular';
import { SingleNotificationComponent } from './components/single-notification/single-notification.component';
import { Store, select } from '@ngrx/store';
import { Reducers, actions } from 'src/app/store';
import * as storeState from 'src/app/shared/interfaces/store/index';
import { NotificationsService } from './services/notifications.service';
import { Plugins } from '@capacitor/core';
import { AdOptions, AdSize, AdPosition } from 'capacitor-admob';

const { AdMob } = Plugins;

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {
  options: AdOptions = {
    adId: "ca-app-pub-3940256099942544/1033173712",
    adSize: AdSize.SMART_BANNER,
    position: AdPosition.BOTTOM_CENTER,
    hasTabBar: false, 
    tabBarHeight: 56
  };
  public notifications: Notification[] = [];

  constructor(public modalController: ModalController,
              public store: Store<Reducers>,
              private notificationsService: NotificationsService
              ) { }

  ngOnInit() {
    this.store.pipe(select('notifications')).subscribe((state: storeState.NotificationsState) => {
      this.notifications = state.notifications;
    });
    this.adsConfiguration();
  }

  ionViewWillEnter() {
    if (this.notifications.find(notification => !notification.isDisplayed)) {
      this.notificationsService.displayAllNotifications().subscribe(res => {});
    }
    this.store.dispatch(actions.notificationActions.displayAllNotifications({  }));
  }

  public async presentModal(notification: Notification, index: number) {
    const modal = await this.modalController.create({
      component: SingleNotificationComponent,
      componentProps: {...notification, index}
    });
    return await modal.present();
  }

  private adsConfiguration(){
    AdMob.prepareInterstitial(this.options).then(
      value => {
        
      },
      error => {
        
      }
    );

 
    // Subscibe Banner Event Listener
    AdMob.addListener("onAdLoaded", (info: boolean) => {
      AdMob.showInterstitial().then(
        value => {
          
        },
        error => {
          
        }
      );
    });
    AdMob.addListener("onAdFailedToLoad", (info: boolean) => {

    });
  }

}
