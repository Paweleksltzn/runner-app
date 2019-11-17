import { createReducer, on, Action } from '@ngrx/store';
import { actions } from 'src/app/store';
import { Workout } from 'src/app/shared/interfaces/workout/workout';
import * as storeState from 'src/app/shared/interfaces/store/index';

export const initialState: storeState.MyWorkoutState = {
    workoutsList: [],
    isStateLoaded: false
};

const myWorkoutReducerOptions = createReducer(initialState,
     on(actions.myWorkoutActions.loadWorkoutsList, ( state, action ) =>
     ({...state, workoutsList: [...action.workoutsList], isStateLoaded: true})),

     on(actions.myWorkoutActions.addWorkoutListElement, ( state, action ) => {
        const workoutListClone = [...state.workoutsList];
        let index = -1;
        workoutListClone.forEach((workout: Workout, workoutIndex: number) => {
           if (workout._id === action.selectedWorkoutId) {
              index = workoutIndex;
           }
        });
        if (index >= 0) {
            workoutListClone[index] = action.workoutsListItem;
        } else {
            workoutListClone.push(action.workoutsListItem);
        }
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
     })
);

export function myWorkoutReducer(state: storeState.MyWorkoutState | undefined, action: Action) {
    return myWorkoutReducerOptions(state, action);
}
