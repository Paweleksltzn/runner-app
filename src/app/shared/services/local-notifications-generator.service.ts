import { Injectable } from '@angular/core';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';

@Injectable({
  providedIn: 'root'
})
export class LocalNotificationsGeneratorService {

  constructor(private localNotifications: LocalNotifications) { }

  public createSimpleNotification(title: string, text: string, sound = '', icon = '') {
    this.localNotifications.schedule({
      id: 1,
      title,
      text,
      sound
    });
  }

}
