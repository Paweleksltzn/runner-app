import { createReducer, on, Action } from '@ngrx/store';
import { actions } from 'src/app/store';
import { MyWorkoutState } from 'src/app/shared/interfaces/my-workouts/myWorkoutState';

export const initialState: MyWorkoutState = {
    workoutsList: []
};

const myWorkoutReducerOptions = createReducer(initialState,
     on(actions.myWorkoutActions.loadWorkoutsList, ( state, action ) =>
     ({...state, workoutsList: [...action.workoutsList]})),

     on(actions.myWorkoutActions.addWorkoutListElement, ( state, action ) =>
     ({...state, workoutsList: [...state.workoutsList, action.workoutsListItem]})),

     on(actions.myWorkoutActions.removeWorkoutListElement, ( state, action ) => {
        const workoutListClone = [...state.workoutsList];
        workoutListClone.splice(action.index, 1);
        return ({...state, workoutsList: [...workoutListClone]});
     })

);

export function myWorkoutReducer(state: MyWorkoutState | undefined, action: Action) {
    return myWorkoutReducerOptions(state, action);
}
