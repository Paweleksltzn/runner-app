import { Action, createReducer, on } from '@ngrx/store';
import * as storeState from 'src/app/shared/interfaces/store/index';
import { actions } from 'src/app/store';

export const initialState: storeState.ProfileState = {
  gradient: 1,
  profImgUrl: 'assets/images/profile-picture.png',
  email: undefined,
  name: undefined,
  surname: undefined,
  profileDesc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum rutrum congue facilisis.',
  userType: 1,
  friends: [],
  isMyProfile: true,
  isMale: undefined,
  accessLevel: undefined, 
  croppedImageUrl: 'assets/images/profile-picture.png' 
};

const profileReducerOptions = createReducer(
  initialState,
  on(actions.profileAction.setTheme, (state, action) => ({ ...state, gradient: action.gradient})),
  on(actions.profileAction.setUserType, (state, action) => ({ ...state, userType: action.userType})),
  on(actions.profileAction.setIsMyProfile, (state, action) =>({ ...state, isMyProfile: action.isMyProfile})),
  on(actions.profileAction.profileData, (state, action) =>({ 
    ...state, 
    email: action.email,
    name: action.name,
    surname: action.surname,
    isMale: action.isMale,
    accessLevel: action.accessLevel
  })),
  on(actions.profileAction.setImg, (state, action) => ({ ...state, croppedImageUrl: action.croppedImageUrl})),
);
export function profileReducer(state: storeState.ProfileState | undefined, action: Action) {
  return profileReducerOptions(state, action);
}
