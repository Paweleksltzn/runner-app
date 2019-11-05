import { createAction, props } from '@ngrx/store';
import { Workout } from 'src/app/shared/interfaces/workout/workout';

export const historyActions = {
    loadHistory: createAction('Load history from base', props<{workoutsHistory: Workout[]}>()),
    removeWorkout: createAction('Remove workout from history', props<{workoutIndex: number}>()),
    addToHistory: createAction('Add workout to history', props<{workout: Workout}>())
};
