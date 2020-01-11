import { Action, createReducer, on } from '@ngrx/store';
import * as storeState from 'src/app/shared/interfaces/store/index';
import { actions } from 'src/app/store';
import { notificationsTypes } from '../enums/notifications-type';

export const initialState: storeState.NotificationsState = {
  notifications: []
};
const notificationsReducerOptions = createReducer(
  initialState,
  on(actions.notificationActions.loadNotifications, (state, action) => ({ ...state, notifications: action.notifications})),
  on(actions.notificationActions.removeNotification, (state, action) => {
      const newNotifications = state.notifications;
      newNotifications.splice(action.index, 1);
      return { ...state, notifications: newNotifications };
    }),
    on(actions.notificationActions.displayAllNotifications, (state, action) => {
        const newNotifications = state.notifications.map(notification => {
            notification.isDisplayed = true;
            return notification;
        });
        return { ...state, notifications: newNotifications };
      })
);
export function notificationsReducer(state: storeState.NotificationsState | undefined, action: Action) {
  return notificationsReducerOptions(state, action);
}
