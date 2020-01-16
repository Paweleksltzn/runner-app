import { UserProfile } from '../profile/userInterface';

export interface Conversation {
    _id?: string;
    lastEditionDate: Date;
    members: {
        userProfile: UserProfile,
        isReaded: boolean
    }[];
    messages: {
        author: UserProfile,
        content: string
    }[];
    userIndex?: number;
    lastEditionStringDate?: string;
}
