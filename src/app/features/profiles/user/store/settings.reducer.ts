import { Action, createReducer, on } from '@ngrx/store';
import { profileAction } from './settings.action';
import * as storeState from 'src/app/shared/interfaces/store/index';

export const initialState: storeState.ProfileState = {
  gradient: 1,
  profImgUrl: 'assets/images/profile-picture.png',
  userName: 'Jacek',
  userSurname: 'Soplica',
  profileDesc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum rutrum congue facilisis.',
  userType: 1
};
const profReducer = createReducer(
  initialState,
  on(profileAction.setTheme, (state, action) => ({ ...state, gradient: action.gradient}))
);
export function profileReducer(state: storeState.ProfileState | undefined, action: Action) {
  return profReducer(state, action);
}
