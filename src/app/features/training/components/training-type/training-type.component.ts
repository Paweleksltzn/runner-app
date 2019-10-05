import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
@Component({
  selector: 'app-training-type',
  templateUrl: './training-type.component.html',
  styleUrls: ['./training-type.component.scss'],
})
export class TrainingTypeComponent implements OnInit {
  

  constructor(public actionSheetCtrl: ActionSheetController) { }

  ngOnInit() {}
  async activityMenu() { 
    const actSheet = await this.actionSheetCtrl.create({
      header: 'Dyscypliny',
      buttons: [{
        text: 'Bieg',
        icon: 'walk'
      }, 
      {
        text: 'Kolarstwo',
        icon: 'bicycle'
      },]
    });
    await actSheet.present();
  }
}
