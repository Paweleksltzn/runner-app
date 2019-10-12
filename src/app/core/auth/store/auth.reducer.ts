import { Coordinates } from '../../../shared/interfaces/coordinates';
import { createReducer, on, Action } from '@ngrx/store';
import { TrainingState } from '../../../shared/interfaces/trainingState';
import { actions } from '../../../store';
import { AuthState } from 'src/app/shared/interfaces/auth/AuthState';

export const initialState: AuthState = {
    email: '',
    name: '',
    surname: '',
    isMale: undefined,
    accessLevel: undefined
}

const authReducerOptions = createReducer(initialState,
     on(actions.authActions.signIn, ( state, action ) => ({
         ...state,
         name: action.name,
         surname: action.surname,
         email: action.email,
         isMale: action.isMale,
         accessLevel: action.accessLevel
    })),
    on(actions.authActions.signOut, ( state, action ) => ({
        ...state,
        email: '',
        name: '',
        surname: '',
        isMale: undefined,
        accessLevel: undefined
    })),

);
  
export function authReducer(state: AuthState | undefined, action: Action) {
    return authReducerOptions(state, action);
}
