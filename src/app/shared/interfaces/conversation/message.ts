import { UserProfile } from '../profile/userInterface';

export interface Message {
    author: UserProfile;
    content: string;
}
