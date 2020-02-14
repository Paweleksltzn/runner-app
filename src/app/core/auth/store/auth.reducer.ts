import { createReducer, on, Action } from '@ngrx/store';
import { actions } from '../../../store';
import * as storeState from 'src/app/shared/interfaces/store/index';

export const initialState: storeState.AuthState = {
    email: '',
    name: '',
    surname: '',
    isMale: undefined,
    accessLevel: undefined,
    _id: ''
};

const authReducerOptions = createReducer(initialState,
     on(actions.authActions.signIn, ( state, action ) => ({
         ...state,
         name: action.name,
         surname: action.surname,
         email: action.email,
         isMale: action.isMale,
         accessLevel: action.accessLevel,
         _id: action._id
    })),
    on(actions.authActions.signOut, ( state, action ) => ({
        ...state,
        email: '',
        name: '',
        surname: '',
        isMale: undefined,
        accessLevel: undefined,
        _id: ''
    })),

);

export function authReducer(state: storeState.AuthState | undefined, action: Action) {
    return authReducerOptions(state, action);
}
