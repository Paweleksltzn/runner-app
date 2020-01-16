import { createAction, props} from '@ngrx/store';

export const profileAction = {
    setTheme: createAction('[Gradient Page] Set Gradients', props<{gradient: number}>()),
    setUserType: createAction('[User Page] Set Users', props<{userType: number}>()),
    setIsMyProfile: createAction('Profile is mein', props<{isMyProfile: boolean}>()),
    profileData: createAction('Current profile dispalyed', props<{email: string, name: string, surname: string, isMale: boolean, accessLevel: number}>()),
    setImg: createAction('img set', props<{croppedImageUrl: string}>())
};
