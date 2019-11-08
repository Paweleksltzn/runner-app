import { Action, createReducer, on } from '@ngrx/store';
import * as setTheme from './settings.action';

export interface State {
  gradient: any;
}
export const initialState: State = {
  gradient: 1,
};
const themeReducer = createReducer(
  initialState,
  on(setTheme.setTheme, (state, { gradient }) => ({ ...state, gradient: gradient}))
);
export function reducer(state: State | undefined, action: Action) {
  return themeReducer(state, action);
}
