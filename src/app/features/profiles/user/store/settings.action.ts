import { createAction, props} from '@ngrx/store';
import { UserProfile } from 'src/app/shared/interfaces/profile/userInterface';

export const profileAction = {
    loadOwnerProfile: createAction('Load profile for owner', props<{userProfile: UserProfile, friends: UserProfile[]}>()),
    loadProfile: createAction('Load profile for user', props<{userProfile: UserProfile}>()),
    setTheme: createAction('[Gradient Page] Set Gradients', props<{gradient: number}>()),
    setUserType: createAction('[User Page] Set Users', props<{userType: number}>()),
    updateDescription: createAction('Update user profile', props<{newDescription: string}>()),
    setIsMyProfile: createAction('Profile is mein', props<{isMyProfile: boolean}>()),
    profileData: createAction('Current profile dispalyed', props<{email: string, name: string, surname: string, isMale: boolean, accessLevel: number}>()),
    setImg: createAction('img set', props<{croppedImageUrl: string}>()),
    addFriend: createAction('Adding friend', props<{newFriend: UserProfile}>()),
    inviteFriend: createAction('Invite friend', props<{invitedFriend: UserProfile}>()),
    rejectFriend: createAction('Friend invitation rejected', props<{rejectedFriend: UserProfile}>()),
    invitationRejected: createAction('Invitation rejected', props<{rejectingProfile: UserProfile}>()),
    newInvitation: createAction('Received new invitation', props<{invitatingFriend: UserProfile}>())
};
