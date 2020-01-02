import { createAction, props} from '@ngrx/store';

export const profileDisplayAction = {
    profileData: createAction('Current profile dispalyed', props<{email: string, name: string, surname: string, isMale: boolean, accessLevel: number}>()),
};