import { createAction, props } from '@ngrx/store';

export const authActions = {
    signIn: createAction('User signed in', props<{email: string, name: string, surname: string, isMale: boolean, accessLevel: number}>()),
    signOut: createAction('User signed out', props<{}>()),
};
