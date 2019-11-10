import { Action, createReducer, on } from '@ngrx/store';
import {setTheme} from './settings.action';

export interface ProfileState {
  gradient: any;
  profImgUrl: string;
}
export const initialState: ProfileState = {
  gradient: 1,
  profImgUrl: 'assets/images/profile-picture.png'
};
const profReducer = createReducer(
  initialState,
  on(setTheme, (state, action) => ({ ...state, gradient: action.gradient}))
);
export function profileReducer(state: ProfileState | undefined, action: Action) {
  return profReducer(state, action);
}
