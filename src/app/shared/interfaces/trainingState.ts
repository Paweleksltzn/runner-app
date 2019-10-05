import { TrainingTime } from 'src/app/shared/interfaces/trainingTime';
import { Coordinates } from 'src/app/shared/interfaces/coordinates';

export interface TrainingState {
     userLat: number;
     userLng: number;
     trainingModeIcon: string;
     mapThemeIcon: string;
     mapStyles: any;
     markerIcon: any; 
     traceMap: Coordinates[];
     trainingTime: TrainingTime;
     distancePassed: number;
     firstTimeAfterStop: boolean
}
