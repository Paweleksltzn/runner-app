import { Component, OnInit } from '@angular/core';
import { trainingOptions } from './options/training.options';
import { ModalController } from '@ionic/angular';
import { TrainingStatisticsComponent } from 'src/app/features/training/components/training.statistics/training.statistics.component';


@Component({
  selector: 'app-training',
  templateUrl: './training.page.html',
  styleUrls: ['./training.page.scss'],
})
export class TrainingPage implements OnInit {
  public userLat: number = +51;
  public userLng: number = +7;
  public trainingModeIcon: string;
  public mapThemeIcon: string;
  public mapStyles: any;
  public markerIcon: any; 
  private trainingOptions = trainingOptions;

  constructor(private modalController: ModalController) { }

  ngOnInit() {
    this.trainingModeIcon = 'pause'; // docelowo czytanie ze store
    this.mapThemeIcon = this.trainingOptions.lightThemeIcon; //docelowo czytanie z pamieci
    this.mapStyles = this.trainingOptions.mapDarkMode;
    this.markerIcon = this.trainingOptions.markerCustomIcon;
  }

  public toggleTrainingState(): void {
    this.trainingModeIcon = this.trainingModeIcon === this.trainingOptions.pauseIcon ? this.trainingOptions.playIcon : this.trainingOptions.pauseIcon;
  }

  public toggleMapMode() {
    // docelowo trzymac aktywny theme w pamieci telefonu a nie hard code
    if (this.mapThemeIcon === this.trainingOptions.lightThemeIcon) {
      this.mapThemeIcon = this.trainingOptions.darkThemeIcon;
      this.mapStyles = this.trainingOptions.mapLightMode;
    } else {
      this.mapThemeIcon = this.trainingOptions.lightThemeIcon;
      this.mapStyles = this.trainingOptions.mapDarkMode;
    }
  }

  public async showInformations() {
    const modal = await this.modalController.create({
      component: TrainingStatisticsComponent
    });
    return await modal.present();
  }

}
