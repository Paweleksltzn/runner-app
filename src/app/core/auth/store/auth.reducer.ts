import { Coordinates } from '../../../shared/interfaces/coordinates';
import { createReducer, on, Action } from '@ngrx/store';
import { TrainingState } from '../../../shared/interfaces/trainingState';
import { actions } from '../../../store';
import { AuthState } from 'src/app/shared/interfaces/auth/AuthState';

export const initialState: AuthState = {
    email: '',
    name: '',
    surname: '',
    isMale: undefined
}

const authReducerOptions = createReducer(initialState,
     on(actions.trainingActions.trainingSecondPassed, ( state, action ) => ({...state, trainingTime: action }))
);
  
export function authReducer(state: AuthState | undefined, action: Action) {
    return authReducerOptions(state, action);
}
