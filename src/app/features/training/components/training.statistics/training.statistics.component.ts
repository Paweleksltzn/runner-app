import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-training.statistics',
  templateUrl: './training.statistics.component.html',
  styleUrls: ['./training.statistics.component.scss'],
})
export class TrainingStatisticsComponent implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

  public cancel() {
    this.modalCtrl.dismiss();
  }

}
