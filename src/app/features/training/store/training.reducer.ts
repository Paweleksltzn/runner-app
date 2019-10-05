import { Coordinates } from '../../../shared/interfaces/coordinates';
import { createReducer, on, Action } from '@ngrx/store';
import { TrainingState } from '../../../shared/interfaces/trainingState';
import { trainingOptions } from '../options/training.options';
import { actions } from '../../../store';

const startingTrainingTime = {
    seconds: '00',
    minutes: '00'
}

export const initialState: TrainingState = {
    userLat: undefined,
    userLng: undefined,
    trainingModeIcon: trainingOptions.pauseIcon,
    mapThemeIcon: trainingOptions.lightThemeIcon,
    mapStyles: trainingOptions.mapDarkMode,
    markerIcon: trainingOptions.markerCustomIcon, 
    traceMap: [],
    trainingTime: startingTrainingTime,
    distancePassed: 0,
    firstTimeAfterStop: true
}

const trainingReducerOptions = createReducer(initialState,
     on(actions.trainingActions.trainingSecondPassed, ( state, action ) => ({...state, trainingTime: action })),
     on(actions.trainingActions.changePosition, ( state, action ) => ({
         ...state,
         distancePassed: action.newDistance,
         userLat: action.newLat,
         userLng: action.newLng,
         traceMap: [
            ...state.traceMap,
         {
            lat: action.newLat,
            lng: action.newLng
         }]
     })),
     on(actions.trainingActions.toggleTrainingTheme, ( state, action ) => ({...state, mapStyles: action.mapStyles, mapThemeIcon: action.mapThemeIcon })),
     on(actions.trainingActions.toggleTrainingState, ( state, action ) => ({...state, trainingModeIcon: action.trainingModeIcon })),
     on(actions.trainingActions.togglePositionWatcher, ( state, action ) => ({...state, firstTimeAfterStop: action.newWatchingState })),
     on(actions.trainingActions.pausePositionWatcher, ( state, action ) => ({...state, firstTimeAfterStop: action.newWatchingState}))
);
  
export function trainingReducer(state: TrainingState | undefined, action: Action) {
    return trainingReducerOptions(state, action);
}
