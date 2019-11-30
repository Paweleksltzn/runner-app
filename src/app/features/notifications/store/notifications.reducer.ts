import { Action, createReducer, on } from '@ngrx/store';
import * as storeState from 'src/app/shared/interfaces/store/index';
import { actions } from 'src/app/store';

export const initialState: storeState.NotificationsState = {
  notifications: [
      {
        title: 'Pierwsze powiadomionko',
        message: `orem ipsum dolor sit amet consectetur adipisicing elit. Laborum rerum commodi unde totam ducimus. Seq
        ui quos ut eaque at atque, quas veritatis vero architecto voluptate nesciunt? Voluptas ab deleniti corrupti.`,
        author: 'Autor jeden',
        dateString: '11.10.2019',
        isDisplayed: false
      },
      {
        title: 'Drugie powiadomionko',
        message: `orem ipsum dolor sit amet consectetur adipisicing elit. Laborum rerum commodi unde totam ducimus. Seq
        ui quos ut eaque at atque, quas veritatis vero architecto voluptate nesciunt? Voluptas ab deleniti corrupti.`,
        author: 'Autor drugi',
        dateString: '09.10.2019',
        isDisplayed: false
      },
      {
        title: 'Trzecie powiadomionko',
        message: `orem ipsum dolor sit amet consectetur adipisicing elit. Laborum rerum commodi unde totam ducimus. Seq
        ui quos ut eaque at atque, quas veritatis vero architecto voluptate nesciunt? Voluptas ab deleniti corrupti.`,
        author: 'Autor trzeci',
        dateString: '08.10.2019',
        isDisplayed: true
      },
  ]
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
