import { UserProfile } from '../profile/userInterface';

export interface LoginResponse {
    token: string;
    userProfile: UserProfile;
    friends: UserProfile[];
}
