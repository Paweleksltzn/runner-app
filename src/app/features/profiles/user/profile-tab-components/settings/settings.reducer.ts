import { Action, createReducer, on } from '@ngrx/store';
import {setTheme} from './settings.action';

export interface State {
  gradient: any;
}
export const initialState: State = {
  gradient: 1,
};
const colorReducer = createReducer(
  initialState,
  on(setTheme, (state, action) => ({ ...state, gradient: action.gradient}))
);
export function themeReducer(state: State | undefined, action: Action) {
  return colorReducer(state, action);
}
