import { createAction, props } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Workout } from 'src/app/shared/interfaces/workout/workout';

export const singleWorkoutActions = {
    trainingSecondPassed: createAction('One workout second passed', props<{seconds: string, minutes: string}>()),
    toggleTimer: createAction('Timer mode has been toggled', props<{}>()),
    subscribeTimer: createAction('Timer has been subscribed', props<{timerSubscription: Subscription}>()),
    unsubscribeTimer: createAction('Timer has been unsubscribed', props<{}>()),
    resetTimer: createAction('Timer is being reset', props<{}>()),
    saveTrainingState: createAction('Traing state has been saved', props<{trainingState: Workout}>()),
    changeTrainingMode: createAction('Training mode has been changed', props<{newTrainingMode: string}>()),
    loadTrainingToShow: createAction('Training to show has been loaded', props<{newTrainingToShow: Workout}>()),
    startWorkout: createAction('Workout has been started', props<{workoutStartingTemplate: Workout}>()),
    // finishWorkout: createAction('Workout has been finished', props<{workoutStartingTemplate}>()),
};
