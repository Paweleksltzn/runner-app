import { createReducer, on, Action } from '@ngrx/store';
import * as storeState from 'src/app/shared/interfaces/store/index';
import { actions } from 'src/app/store';

const startingTrainingTime = {
    seconds: '00',
    minutes: '00'
};

export const initialState: storeState.WorkoutState = {
    currentWorkout: undefined,
    workoutToShow: undefined,
    historyWorkout: undefined,
    trainingTime: {
        ...startingTrainingTime
    },
    isTimerOn: false,
    timerSubscription: undefined,
    trainingMode: ''
};

const singleWorkoutReducerOptions = createReducer(initialState,
     on(actions.singleWorkoutActions.trainingSecondPassed, ( state, action ) =>
     ({...state, trainingTime: action })),

     on(actions.singleWorkoutActions.toggleTimer, ( state, action ) =>
      ({...state, isTimerOn: !state.isTimerOn, currentMiliseconds: undefined})),

      on(actions.singleWorkoutActions.subscribeTimer, ( state, action ) =>
      ({...state, timerSubscription: action.timerSubscription })),

      on(actions.singleWorkoutActions.unsubscribeTimer, ( state, action ) =>
      ({...state, timerSubscription: undefined})),

      on(actions.singleWorkoutActions.resetTimer, ( state, action ) =>
      ({...state, trainingTime: {...startingTrainingTime} })),

      on(actions.singleWorkoutActions.saveTrainingState, ( state, action ) =>
      ({...state, currentWorkout: action.trainingState })),

      on(actions.singleWorkoutActions.changeTrainingMode, ( state, action ) =>
      ({...state, trainingMode: action.newTrainingMode })),

      on(actions.singleWorkoutActions.loadTrainingToShow, ( state, action ) => {
        const newWorkout = JSON.parse(JSON.stringify(action.newTrainingToShow)) || [];
        return {...state, workoutToShow: newWorkout };
      }),

      on(actions.singleWorkoutActions.startWorkout, ( state, action ) => {
        const newWorkout = JSON.parse(JSON.stringify(action.workoutStartingTemplate)) || [];
        return {...state, currentWorkout: newWorkout};
      }),

      on(actions.singleWorkoutActions.finishWorkout, ( state, action ) =>
      ({...state, currentWorkout: undefined })),

      on(actions.singleWorkoutActions.loadTrainingToHistory, ( state, action ) => {
        const newWorkout = JSON.parse(JSON.stringify(action.newTrainingToShow)) || [];
        return {...state, historyWorkout: newWorkout };
      })

);

export function singleWorkoutReducer(state: storeState.WorkoutState | undefined, action: Action) {
    return singleWorkoutReducerOptions(state, action);
}
