import { Notification } from './notification';

export interface NewFriendNotification extends Notification {
    newFriendId?: string;
}
