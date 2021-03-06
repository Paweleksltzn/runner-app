import { createAction, props} from '@ngrx/store';
import { UserProfile } from 'src/app/shared/interfaces/profile/userInterface';
import { Achievment } from 'src/app/shared/interfaces/profile/achievment';

export const profileAction = {
    loadOwnerProfile: createAction('Load profile for owner', props<{userProfile: UserProfile, friends: UserProfile[]}>()),
    loadProfile: createAction('Load profile for user', props<{userProfile: UserProfile}>()),
    loadRates: createAction('Load rates', props<{newRatesSum: number, newRatesAmount: number}>()),
    setTheme: createAction('[Gradient Page] Set Gradients', props<{gradient: number}>()),
    updateDescription: createAction('Update user profile', props<{newDescription: string}>()),
    setIsMyProfile: createAction('Profile is mein', props<{isMyProfile: boolean}>()),
    profileData: createAction('Current profile dispalyed',
     props<{email: string, name: string, surname: string, isMale: boolean, accessLevel: number}>()),
    setImg: createAction('img set', props<{ownerImgUrl: string}>()),
    addFriend: createAction('Adding friend', props<{newFriend: UserProfile}>()),
    removeFriend: createAction('Remove friend', props<{removedFriendId: string}>()),
    inviteFriend: createAction('Invite friend', props<{invitedFriend: UserProfile}>()),
    rejectFriend: createAction('Friend invitation rejected', props<{rejectedFriend: UserProfile}>()),
    invitationRejected: createAction('Invitation rejected', props<{rejectingProfile: UserProfile}>()),
    newInvitation: createAction('Received new invitation', props<{invitatingFriend: UserProfile}>()),
    setOwnerAccessLevel: createAction('User access level changed', props<{ownerAccessLevel: number}>()),
    setTemporaryImg: createAction('img set temporary', props<{croppedImageUrl: string}>()),
    getAchievment: createAction('Get achievment', props<{newAchievment: Achievment}>())
};
