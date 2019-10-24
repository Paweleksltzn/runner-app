import { createReducer, on, Action } from '@ngrx/store';
import { actions } from 'src/app/store';
import { MyWorkoutState } from 'src/app/shared/interfaces/my-workouts/myWorkoutState';

export const initialState: MyWorkoutState = {
    workoutsList: [],
    isStateLoaded: false
};

const myWorkoutReducerOptions = createReducer(initialState,
     on(actions.myWorkoutActions.loadWorkoutsList, ( state, action ) =>
     ({...state, workoutsList: [...action.workoutsList], isStateLoaded: true})),

     on(actions.myWorkoutActions.addWorkoutListElement, ( state, action ) => {
        const workoutListClone = [...state.workoutsList];
        workoutListClone.push(action.workoutsListItem);
        return {...state, workoutsList: workoutListClone};
     }),

     on(actions.myWorkoutActions.removeWorkoutListElement, ( state, action ) => {
        const workoutListClone = [...state.workoutsList];
        workoutListClone.splice(action.index, 1);
        return ({...state, workoutsList: [...workoutListClone]});
     }),

     on(actions.myWorkoutActions.updateWorkoutListElement, ( state, action ) => {
        const workoutListClone = [...state.workoutsList];
        workoutListClone[action.index] = action.workoutListItem;
        return ({...state, workoutsList: [...workoutListClone]});
     }),
);

export function myWorkoutReducer(state: MyWorkoutState | undefined, action: Action) {
    return myWorkoutReducerOptions(state, action);
}
