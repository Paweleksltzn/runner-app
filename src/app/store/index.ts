import { trainingActions } from '../features/training/store/training.actions';
import { authActions } from 'src/app/core/auth/store/auth.actions';
import { singleWorkoutActions } from 'src/app/shared/components/single-workout/store/single-workout-action';
import { myWorkoutActions } from 'src/app/features/workouts/my-workouts/store/my-workout-action';
import { historyActions } from 'src/app/features/workouts/history/store/history-action';

export const actions = {
    trainingActions,
    authActions,
    singleWorkoutActions,
    myWorkoutActions,
    historyActions
};
