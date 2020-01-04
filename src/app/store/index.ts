import { authActions } from 'src/app/core/auth/store/auth.actions';
import { singleWorkoutActions } from 'src/app/shared/components/single-workout/store/single-workout-action';
import { profileAction } from 'src/app/features/profiles/user/store/settings.action';
import { myWorkoutActions } from 'src/app/features/workouts/my-workouts/store/my-workout-action';
import { historyActions } from 'src/app/features/workouts/history/store/history-action';
import { notificationActions } from 'src/app/features/notifications/store/notifications.action';
import * as state from '../shared/interfaces/store/index';

export const actions = {
    authActions,
    singleWorkoutActions,
    profileAction,
    myWorkoutActions,
    historyActions,
    notificationActions,
};

export interface Reducers {
    auth: state.AuthState;
    myWorkouts: state.MyWorkoutState;
    singleWorkout: state.WorkoutState;
    history: state.MyWorkoutState;
    profile: state.ProfileState;
    notifications: state.NotificationsState;
}
