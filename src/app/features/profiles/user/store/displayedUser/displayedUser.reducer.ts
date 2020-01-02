import { Action, createReducer, on } from '@ngrx/store';
import * as storeState from 'src/app/shared/interfaces/store/index';
import { actions } from 'src/app/store';

export const initialState: storeState.DisplayedUserState = {
    email: '',
    name: '',
    surname: '',
    isMale: undefined,
    accessLevel: 0
  };

  const displayUserReducerOptions = createReducer(
    initialState,
    on(actions.profileDisplayAction.profileData, (state, action) => ({          
        ...state,
        name: action.name,
        surname: action.surname,
        email: action.email,
        isMale: action.isMale,
        accessLevel: action.accessLevel})),
  );
  export function displayUserReducer(state: storeState.DisplayedUserState | undefined, action: Action) {
    return displayUserReducerOptions(state, action);
}
