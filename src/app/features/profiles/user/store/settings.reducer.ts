import { Action, createReducer, on } from '@ngrx/store';
import * as storeState from 'src/app/shared/interfaces/store/index';
import { actions } from 'src/app/store';

export const initialState: storeState.ProfileState = {
  gradient: 1,
  profImgUrl: 'assets/images/profile-picture.png',
  userName: 'Jacek',
  userSurname: 'Soplica',
  profileDesc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum rutrum congue facilisis.',
  userType: 1
};

const profileReducerOptions = createReducer(
  initialState,
  on(actions.profileAction.setTheme, (state, action) => ({ ...state, gradient: action.gradient}))
);
export function profileReducer(state: storeState.ProfileState | undefined, action: Action) {
  return profileReducerOptions(state, action);
}
