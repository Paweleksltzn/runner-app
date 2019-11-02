import { createAction, props } from '@ngrx/store';
import { Workout } from 'src/app/shared/interfaces/workout/workout';

export const myWorkoutActions = {
    loadWorkoutsList: createAction('Full workouts list loaded', props<{workoutsList: Workout[]}>()),
    addWorkoutListElement: createAction('add workout list element', props<{workoutsListItem: Workout, selectedWorkoutId?: string}>()),
    removeWorkoutListElement: createAction('remove workout list element', props<{index: number}>()),
    updateWorkoutListElement: createAction('update workout list element', props<{index: number, workoutListItem: Workout}>())
};
