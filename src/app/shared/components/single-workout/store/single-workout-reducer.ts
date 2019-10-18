import { createReducer, on, Action } from '@ngrx/store';
import { WorkoutState } from 'src/app/shared/interfaces/workout/WorkoutState';
import { actions } from 'src/app/store';

const startingTrainingTime = {
    seconds: '00',
    minutes: '00'
};

export const initialState: WorkoutState = {
    currentWorkout: undefined,
    trainingTime: {
        ...startingTrainingTime
    },
    isTimerOn: false,
    timerSubscription: undefined
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
      ({...state, currentWorkout: action.trainingState }))
);

export function singleWorkoutReducer(state: WorkoutState | undefined, action: Action) {
    return singleWorkoutReducerOptions(state, action);
}
