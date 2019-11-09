import { createReducer, on, Action } from '@ngrx/store';
import { actions } from '../../../store';
import * as storeState from 'src/app/shared/interfaces/store/index';

export const initialState: storeState.AuthState = {
    email: '',
    name: '',
    surname: '',
    isMale: undefined,
    accessLevel: undefined
};

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

export function authReducer(state: storeState.AuthState | undefined, action: Action) {
    return authReducerOptions(state, action);
}
