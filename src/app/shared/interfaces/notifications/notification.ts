import { User } from '../auth/User';

export interface Notification {
    title: string;
    message: string;
    author: User;
    isDisplayed: boolean;
    type: string;
    newFriendId?: string;
    creationDate?: Date;
    _id?: string;
}
