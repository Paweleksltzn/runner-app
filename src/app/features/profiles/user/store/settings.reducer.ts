import { Action, createReducer, on } from '@ngrx/store';
import * as storeState from 'src/app/shared/interfaces/store/index';
import { actions } from 'src/app/store';

export const initialState: storeState.ProfileState = {
  gradient: 2,
  imgUrl: 'assets/images/profile-picture.png',
  email: undefined,
  name: undefined,
  surname: undefined,
  profileDescription: '',
  userType: 1,
  isMyProfile: true,
  isMale: undefined,
  accessLevel: undefined,
  friends: [],
  invitedToFriends: [],
  friendsInvitations: [],
  ownerGradient: 2,
  ownerImgUrl: 'assets/images/profile-picture.png',
  ownerEmail: undefined,
  ownerName: undefined,
  ownerSurname: undefined,
  ownerProfileDescription: '',
  ownerUserType: 1,
  ownerIsMale: undefined,
  ownerAccessLevel: undefined,
  ownerFriends: [],
  ownerInvitedToFriends: [],
  ownerFriendsInvitations: []
};

const profileReducerOptions = createReducer(
  initialState,
  on(actions.profileAction.loadOwnerProfile, (state, action) => ({
    ...state,
    ownerEmail: action.userProfile.email,
    ownerName: action.userProfile.name,
    ownerSurname: action.userProfile.surname,
    ownerIsMale: action.userProfile.isMale,
    ownerAccessLevel: action.userProfile.accessLevel,
    ownerImgUrl: action.userProfile.imgUrl,
    ownerProfileDescription: action.userProfile.profileDescription,
    ownerFriends: action.friends || [],
    ownerGradient: action.userProfile.gradient,
    ownerInvitedToFriends: action.userProfile.invitedToFriends || [],
    ownerFriendsInvitations: action.userProfile.friendsInvitations || []
    }
  )),
  on(actions.profileAction.loadProfile, (state, action) => ({
    ...state,
    email: action.userProfile.email,
    name: action.userProfile.name,
    surname: action.userProfile.surname,
    isMale: action.userProfile.isMale,
    accessLevel: action.userProfile.accessLevel,
    imgUrl: action.userProfile.imgUrl,
    gradient: action.userProfile.gradient,
    profileDescription: action.userProfile.profileDescription,
    friends: action.userProfile.friends || [],
    invitedToFriends: action.userProfile.invitedToFriends || [],
    friendsInvitations: action.userProfile.friendsInvitations || []
    }
  )),
  on(actions.profileAction.setTheme, (state, action) => ({ ...state, ownerGradient: action.gradient})),
  on(actions.profileAction.setUserType, (state, action) => ({ ...state, userType: action.userType})),
  on(actions.profileAction.updateDescription, (state, action) => ({ ...state, ownerProfileDescription: action.newDescription})),
  on(actions.profileAction.setIsMyProfile, (state, action) => ({ ...state, isMyProfile: action.isMyProfile})),
  on(actions.profileAction.addFriend, (state, action) => {
    const index = state.ownerFriendsInvitations.indexOf(action.newFriend);
    state.ownerFriendsInvitations.splice(index, 1);
    return ({ ...state, ownerFriends: [...state.ownerFriends, action.newFriend]});
  }),
  on(actions.profileAction.rejectFriend, (state, action) => {
    const index = state.ownerFriendsInvitations.indexOf(action.rejectedFriend);
    state.ownerFriendsInvitations.splice(index, 1);
    return ({ ...state });
  }),
  on(actions.profileAction.inviteFriend, (state, action) =>
   ({ ...state, ownerInvitedToFriends: [...state.ownerInvitedToFriends, action.invitedFriend]}))
);
export function profileReducer(state: storeState.ProfileState | undefined, action: Action) {
  return profileReducerOptions(state, action);
}
