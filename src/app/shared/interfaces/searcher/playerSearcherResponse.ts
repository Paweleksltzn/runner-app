import { UserProfile } from '../profile/userInterface';

export interface UserSearcherResponse {
    email: string;
    name: string;
    surname: string;
    isMale: boolean;
    accessLevel: number;
    isInvitedToFriends?: boolean;
    isFriend?: boolean;
    userProfile: UserProfile;
}
