import { User } from '../../auth/User';
import { UserProfile } from '../../profile/userInterface';

export interface ProfileState extends User {
    gradient: number;
    imgUrl: string;
    profileDescription: string;
    userType: number;
    isMyProfile: boolean;
    accessLevel: number;
    invitedToFriends?: UserProfile[];
    friendsInvitations?: UserProfile[];
    friends?: UserProfile[];
}
