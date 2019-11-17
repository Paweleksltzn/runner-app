import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable()
export class ToastGeneratorService {

  constructor(private toastController: ToastController) { }

  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      animated: true,
      color
    });
    toast.present();
  }

}
