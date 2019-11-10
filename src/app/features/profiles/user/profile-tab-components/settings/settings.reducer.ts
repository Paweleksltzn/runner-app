import { Action, createReducer, on } from '@ngrx/store';
import { setThemeAction } from './settings.action';

export interface ProfileState {
  gradient: number;
  profImgUrl: string;
  userName: string;
  userSurname: string;
  profileDesc: string;
}
export const initialState: ProfileState = {
  gradient: 1,
  profImgUrl: 'assets/images/profile-picture.png',
  userName: 'Jacek',
  userSurname: 'Soplica',
  profileDesc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum rutrum congue facilisis.'
};
const profReducer = createReducer(
  initialState,
  on(setThemeAction.setTheme, (state, action) => ({ ...state, gradient: action.gradient}))
);
export function profileReducer(state: ProfileState | undefined, action: Action) {
  return profReducer(state, action);
}
