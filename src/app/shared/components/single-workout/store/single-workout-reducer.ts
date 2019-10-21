import { createReducer, on, Action } from '@ngrx/store';
import { WorkoutState } from 'src/app/shared/interfaces/workout/WorkoutState';
import { actions } from 'src/app/store';
import { testWorkout } from '../testWorkoutData';

const startingTrainingTime = {
    seconds: '00',
    minutes: '00'
};

export const initialState: WorkoutState = {
    currentWorkout: testWorkout,
    workoutToShow: undefined,
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

      on(actions.singleWorkoutActions.loadTrainingToShow, ( state, action ) =>
      ({...state, workoutToShow: action.newTrainingToShow }))

);

export function singleWorkoutReducer(state: WorkoutState | undefined, action: Action) {
    return singleWorkoutReducerOptions(state, action);
}
