import { createReducer, on, Action } from '@ngrx/store';
import { actions } from 'src/app/store';
import * as storeState from 'src/app/shared/interfaces/store/index';
import { Workout } from 'src/app/shared/interfaces/workout/workout';

export const initialState: storeState.MyWorkoutState = {
    workoutsList: [],
    isStateLoaded: false
};

const createNewHistoryWorkout = (newWorkoutInHistory: Workout) => {
    const durationInMs = Date.now() - newWorkoutInHistory.startTime;
    let seconds: any = Math.floor(durationInMs / 1000);
    let minutes: any = Math.floor(seconds / 60);
    seconds = seconds - minutes * 60;
    let hours: any = Math.floor(minutes / 60);
    minutes = minutes - hours * 60;
    seconds = seconds > 10 ? seconds : `0${seconds}`;
    minutes = minutes > 10 ? minutes : `0${minutes}`;
    hours = hours > 10 ? hours : `0${hours}`;
    return `${hours}:${minutes}:${seconds}`;
};

const historyReducerOptions = createReducer(initialState,
     on(actions.historyActions.loadHistory, ( state, action ) =>
     ({...state, workoutsList: [...state.workoutsList, ...action.workoutsHistory], isStateLoaded: true})),

     on(actions.historyActions.removeWorkout, ( state, action ) => {
        const newWorkoutsList = state.workoutsList.slice();
        newWorkoutsList.splice(action.workoutIndex, 1);
        return  {...state, workoutsList: newWorkoutsList};
     }),

    on(actions.historyActions.addToHistory, ( state, action ) => {
        action.workout.duration = createNewHistoryWorkout(action.workout);
        return  {...state, workoutsList: [action.workout, ...state.workoutsList]};
     }),
);

export function historyReducer(state: storeState.MyWorkoutState | undefined, action: Action) {
    return historyReducerOptions(state, action);
}
