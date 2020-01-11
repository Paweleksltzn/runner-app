import { User } from '../auth/User';

export interface Notification {
    title: string;
    message: string;
    author: User;
    dateString: string;
    isDisplayed: boolean;
    type: string;
    newFriendId?: string;
    creationDate?: Date;
}
