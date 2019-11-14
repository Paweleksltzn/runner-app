import { trainingActions } from '../features/training/store/training.actions';
import { authActions } from 'src/app/core/auth/store/auth.actions';
import { singleWorkoutActions } from 'src/app/shared/components/single-workout/store/single-workout-action';
import { setThemeAction } from 'src/app/features/profiles/user/store/settings.action';

export const actions = {
    trainingActions,
    authActions,
    singleWorkoutActions,
    setThemeAction
};
