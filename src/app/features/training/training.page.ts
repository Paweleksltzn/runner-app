import { Component, OnInit } from '@angular/core';
import { trainingOptions } from './options/training.options';
import { ModalController } from '@ionic/angular';
import { TrainingStatisticsComponent } from 'src/app/features/training/components/training.statistics/training.statistics.component';
import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';
import { Subscription, interval } from 'rxjs';
import { TrainingTime } from 'src/app/shared/interfaces/trainingTime';
import { Store, select } from '@ngrx/store';
import { TrainingState } from '../../shared/interfaces/trainingState';
import { Coordinates } from '../../shared/interfaces/coordinates';
import { actions } from '../../store/index';

@Component({
  selector: 'app-training',
  templateUrl: './training.page.html',
  styleUrls: ['./training.page.scss'],
})
export class TrainingPage implements OnInit {
  public userLat: number;
  public userLng: number;
  public trainingModeIcon: string;
  public mapThemeIcon: string;
  public mapStyles: any;
  public markerIcon: any; 
  public traceMap: Coordinates[] = [];
  public trainingTime: TrainingTime;
  public distancePassed: number;
  public trainingOptions = trainingOptions;
  private firstTimeAfterStop: boolean;
  private userPositionSubscription: Subscription;
  private timerSubscription: Subscription;
  constructor(private modalController: ModalController, private geolocation: Geolocation,
  private store: Store<{training: TrainingState}>) { }

  ngOnInit() {
    // docelowo czytanie ze store telefonu
    this.store.pipe(select('training')).subscribe((state: TrainingState) => {
      this.userLat = state.userLat;
      this.userLng = state.userLng;
      this.trainingTime = state.trainingTime;
      this.trainingModeIcon = state.trainingModeIcon;
      this.mapThemeIcon = state.mapThemeIcon;
      this.mapStyles = state.mapStyles;
      this.markerIcon = state.markerIcon;
      this.firstTimeAfterStop = state.firstTimeAfterStop;
      this.distancePassed = state.distancePassed;
      if (this.distancePassed > state.distancePassed) this.distancePassed = state.distancePassed;
      this.traceMap = state.traceMap;
    });
    this.watchUserCurrentPosition();
  } 

  private watchUserCurrentPosition(): void {
    this.userPositionSubscription = this.geolocation.watchPosition({ enableHighAccuracy: true })
    .subscribe((data: Geoposition)=> {
      const newLat = data.coords.latitude;
      const newLng = data.coords.longitude;
      this.calculateDistance(newLat, newLng);
      if (!this.firstTimeAfterStop && !this.timerSubscription) {
        this.runTimer();
      } 
    }, err => {
      // redirect gdzies indziej jak cos sie spierdoli
    });
  }

  private calculateDistance(newLat: number, newLng: number): void {
    let d = 0;
    if (!this.firstTimeAfterStop) {
      const R = 6371; // Radius of the earth in km
      const dLat = this.degree2radian(newLat - this.userLat);
      const dLon = this.degree2radian(newLng - this.userLng); 
      const a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(this.degree2radian(this.userLat)) * Math.cos(this.degree2radian(newLat)) * 
        Math.sin(dLon/2) * Math.sin(dLon/2)
        ; 
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
      d = R * c; // Distance in km
    } else {
      this.store.dispatch(actions.trainingActions.togglePositionWatcher({
        newWatchingState: !this.firstTimeAfterStop
      }));
    }
    const newDistanceToBeSet = Math.round((this.distancePassed + d) * 1000) / 1000;
    this.store.dispatch(actions.trainingActions.changePosition({ 
      newDistance: newDistanceToBeSet,
      newLat,
      newLng
     }));
  }

  private degree2radian(deg): number {
    return deg * (Math.PI / 180);
  }

  private calculateSpeed() {
    
  }

  public toggleTrainingState(): void {
    if (this.trainingModeIcon === this.trainingOptions.pauseIcon) {
      this.store.dispatch(actions.trainingActions.toggleTrainingState({
        trainingModeIcon: this.trainingOptions.playIcon
      }));
      this.store.dispatch(actions.trainingActions.pausePositionWatcher({
        newWatchingState: true
      }));
      this.userPositionSubscription.unsubscribe();
      this.timerSubscription.unsubscribe();
      this.timerSubscription = undefined;
    } else {
      this.store.dispatch(actions.trainingActions.toggleTrainingState({
        trainingModeIcon: this.trainingOptions.pauseIcon
      }));
      this.watchUserCurrentPosition();
    }
  }

  public toggleMapMode(): void {
    // docelowo trzymac aktywny theme w pamieci telefonu a nie hard code
    if (this.mapThemeIcon === this.trainingOptions.lightThemeIcon) {
      this.store.dispatch(actions.trainingActions.toggleTrainingTheme({
        mapStyles: this.trainingOptions.mapLightMode,
        mapThemeIcon: this.trainingOptions.darkThemeIcon
      }));
    } else {
      this.store.dispatch(actions.trainingActions.toggleTrainingTheme({
        mapStyles: this.trainingOptions.mapDarkMode,
        mapThemeIcon: this.trainingOptions.lightThemeIcon
      }));
    }
  }
  
  public async showInformations() {
    const modal = await this.modalController.create({
      component: TrainingStatisticsComponent
    });
    return await modal.present();
  } 

  private runTimer(): void {
    let minutes = this.trainingTime.minutes;
    let seconds = this.trainingTime.seconds;
    if (!minutes) minutes = '0';
    if (!seconds) seconds ='0';
    this.timerSubscription = interval(1000).subscribe((data) => {
      seconds = `${ +seconds + 1 }`;
      if (+seconds === 60) {
        minutes = `${ +minutes + 1 }`;
        seconds = '0';
      }
      if (seconds.length < 2) {
        seconds = `0${ seconds }`
      }
      if (minutes.length < 2) {
        minutes = `0${ minutes }`
      }
      this.store.dispatch(actions.trainingActions.trainingSecondPassed({ seconds, minutes }));
    });
  }

}
