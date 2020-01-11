import { createAction, props} from '@ngrx/store';
import { UserProfile } from 'src/app/shared/interfaces/profile/userInterface';

export const profileAction = {
    loadOwnerProfile: createAction('Load profile for owner', props<{userProfile: UserProfile}>()),
    loadProfile: createAction('Load profile for user', props<{userProfile: UserProfile}>()),
    setTheme: createAction('[Gradient Page] Set Gradients', props<{gradient: number}>()),
    setUserType: createAction('[User Page] Set Users', props<{userType: number}>()),
    setIsMyProfile: createAction('Profile is mein', props<{isMyProfile: boolean}>()),
    addFriend: createAction('Adding friend', props<{newFriend: UserProfile}>()),
    inviteFriend: createAction('Invite friend', props<{invitedFriend: UserProfile}>()),
    rejectFriend: createAction('Friend invitation rejected', props<{rejectedFriend: UserProfile}>())
};
