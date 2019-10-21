import { createAction, props } from '@ngrx/store';
import { Workout } from 'src/app/shared/interfaces/workout/workout';

export const myWorkoutActions = {
    loadWorkoutsList: createAction('Full workouts list loaded', props<{workoutsList: Workout[]}>()),
    addWorkoutListElement: createAction('add workout list element', props<{workoutsListItem: Workout}>()),
    removeWorkoutListElement: createAction('remove workout list element', props<{workoutsListItem: Workout, index: number}>())
};
