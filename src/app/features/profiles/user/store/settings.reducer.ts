import { Action, createReducer, on } from '@ngrx/store';
import * as storeState from 'src/app/shared/interfaces/store/index';
import { actions } from 'src/app/store';

export const initialState: storeState.ProfileState = {
  gradient: undefined,
  imgUrl: undefined,
  email: undefined,
  name: undefined,
  surname: undefined,
  profileDescription: '',
  isMyProfile: true,
  isMale: undefined,
  accessLevel: undefined,
  friends: [],
  invitedToFriends: [],
  friendsInvitations: [],
  profileId: '',
  ownerProfileId: '',
  ownerGradient: undefined,
  ownerImgUrl: 'assets/images/profile-picture.png',
  croppedImageUrl: '',
  ownerEmail: undefined,
  ownerName: undefined,
  ownerSurname: undefined,
  ownerProfileDescription: '',
  ownerIsMale: undefined,
  ownerAccessLevel: undefined,
  ratesAmount: undefined,
  ratesSum: 0,
  ownerRatesSum: 0,
  ownerRatesAmount: 0,
  ratedTrainers: undefined,
  ownerFriends: [],
  ownerInvitedToFriends: [],
  ownerFriendsInvitations: [],
  ownerAchievments: [],
  achievments: []
};

const profileReducerOptions = createReducer(
  initialState,
  on(actions.profileAction.loadOwnerProfile, (state, action) => ({
    ...state,
    ownerProfileId: action.userProfile._id,
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
    ownerFriendsInvitations: action.userProfile.friendsInvitations || [],
    ownerRatesAmount: action.userProfile.ratesAmount,
    ownerRatesSum: action.userProfile.ratesSum,
    ratedTrainers: action.userProfile.ratedTrainers,
    ownerAchievments: action.userProfile.achievments
    }
  )),
  on(actions.profileAction.loadProfile, (state, action) => ({
    ...state,
    profileId: action.userProfile._id,
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
    friendsInvitations: action.userProfile.friendsInvitations || [],
    ratesAmount: action.userProfile.ratesAmount,
    ratesSum: action.userProfile.ratesSum,
    achievments: action.userProfile.achievments
    }
  )),
  on(actions.profileAction.setTheme, (state, action) => ({ ...state, ownerGradient: action.gradient})),
  on(actions.profileAction.setIsMyProfile, (state, action) => ({ ...state, isMyProfile: action.isMyProfile})),
  on(actions.profileAction.profileData, (state, action) => ({
    ...state,
    email: action.email,
    name: action.name,
    surname: action.surname,
    isMale: action.isMale,
    accessLevel: action.accessLevel
  })),
  on(actions.profileAction.setImg, (state, action) => ({ ...state, ownerImgUrl: action.ownerImgUrl})),
  on(actions.profileAction.updateDescription, (state, action) => ({ ...state, ownerProfileDescription: action.newDescription})),
  on(actions.profileAction.setIsMyProfile, (state, action) => ({ ...state, isMyProfile: action.isMyProfile})),
  on(actions.profileAction.addFriend, (state, action) => {
    const index = state.ownerFriendsInvitations.indexOf(action.newFriend);
    state.ownerFriendsInvitations.splice(index, 1);
    const otherIndex = state.ownerInvitedToFriends.indexOf(action.newFriend);
    state.ownerInvitedToFriends.splice(otherIndex, 1);
    return ({ ...state, ownerFriends: [...state.ownerFriends, action.newFriend]});
  }),
  on(actions.profileAction.removeFriend, (state, action) => {
    const index = state.ownerFriends.findIndex(friend => friend._id === action.removedFriendId);
    state.ownerFriends.splice(index, 1);
    return ({ ...state });
  }),
  on(actions.profileAction.invitationRejected, (state, action) => {
    const index = state.ownerInvitedToFriends.indexOf(action.rejectingProfile);
    state.ownerInvitedToFriends.splice(index, 1);
    return ({ ...state });
  }),
  on(actions.profileAction.newInvitation, (state, action) =>
   ({ ...state, ownerFriendsInvitations: [...state.ownerFriendsInvitations, action.invitatingFriend]})
  ),
  on(actions.profileAction.rejectFriend, (state, action) => {
    const index = state.ownerFriendsInvitations.indexOf(action.rejectedFriend);
    state.ownerFriendsInvitations.splice(index, 1);
    return ({ ...state });
  }),
  on(actions.profileAction.inviteFriend, (state, action) =>
   ({ ...state, ownerInvitedToFriends: [...state.ownerInvitedToFriends, action.invitedFriend]})),
   on(actions.profileAction.setOwnerAccessLevel, (state, action) => ({
     ...state,
     ownerAccessLevel: action.ownerAccessLevel
   })),
   on(actions.profileAction.setTemporaryImg, (state, action) => ({ ...state, croppedImageUrl: action.croppedImageUrl})),
   on(actions.profileAction.loadRates, (state, action) => {
    return ({ ...state, ratesAmount: action.newRatesAmount, ratesSum: action.newRatesSum });
   }),
   on(actions.profileAction.getAchievment, (state, action) => {
    return ({ ...state, ownerAchievments: [...state.ownerAchievments, action.newAchievment] });
   })
);
export function profileReducer(state: storeState.ProfileState | undefined, action: Action) {
  return profileReducerOptions(state, action);
}
