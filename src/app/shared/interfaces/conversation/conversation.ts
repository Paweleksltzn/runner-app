import { UserProfile } from '../profile/userInterface';

export interface Conversation {
    lastEditionDate: Date;
    members: {
        userProfile: UserProfile,
        isReaded: boolean
    }[];
    messages: {
        author: UserProfile,
        content: string
    }[];
}
