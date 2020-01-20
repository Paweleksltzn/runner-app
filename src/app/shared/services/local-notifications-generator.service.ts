import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';
const { LocalNotifications } = Plugins;
@Injectable({
  providedIn: 'root'
})
export class LocalNotificationsGeneratorService {

  constructor() { }

  public async createSimpleNotification(title: string, body: string, sound = '', icon = '') {
    await LocalNotifications.schedule({
      notifications: [{
      id: 1,
      title,
      body,
      sound,
      schedule: {
        at: new Date(Date.now() + 1000 * 0.5)
      },
      }]
  });
  }

}
