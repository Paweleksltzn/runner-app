import { Action, setTheme } from './settings.action';

export interface themeState {
    gradient: number ;
}
export const initialState: themeState = {
    gradient: 1
  };
export const themeReducer: (state: themeState, action: Action) => themeState
 = (state = initialState, action: Action) => {
   return {...state, gradient: action.payload};
 };