import { createAction, props } from '@ngrx/store';

export const trainingActions = {
    trainingSecondPassed: createAction('One training second passed', props<{seconds: string, minutes: string}>()),
    changePosition: createAction('Training distance changed', props<{newDistance: number, newLat: number, newLng: number}>()),
    toggleTrainingTheme: createAction('Toggle training map theme', props<{mapStyles: any, mapThemeIcon: string}>()),
    toggleTrainingState: createAction('Toggle training state icons', props<{trainingModeIcon: string}>()),
    togglePositionWatcher: createAction('Toggle position watcher', props<{newWatchingState: boolean}>()),
    pausePositionWatcher: createAction('Pause position watcher', props<{newWatchingState: boolean}>())
}
