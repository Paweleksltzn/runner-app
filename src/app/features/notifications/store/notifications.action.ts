import { createAction, props} from '@ngrx/store';
import { Notification } from 'src/app/shared/interfaces/notifications/notification';

export const notificationActions = {
    loadNotifications: createAction('[Notifications page] load notifications', props<{notifications: Notification[]}>()),
    removeNotification: createAction('[Notifications page] remove notification', props<{index: number}>()),
    displayAllNotifications: createAction('[Notifications page] display all notifications', props<{  }>()),
    addNotification: createAction('[Notifications page] add new notification', props<{newNotification: Notification}>())
};
