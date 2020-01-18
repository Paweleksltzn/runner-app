import { User } from '../../auth/User';
import { UserProfile } from '../../profile/userInterface';

export interface ProfileState extends User {
    gradient: number;
    imgUrl: string;
    profileDescription: string;
    userType: number;
    isMyProfile: boolean;
    accessLevel: number;
    croppedImageUrl: string;
    invitedToFriends?: UserProfile[];
    friendsInvitations?: UserProfile[];
    friends?: UserProfile[];
    ownerGradient: number;
    ownerImgUrl: string;
    ownerEmail: string;
    ownerName: string;
    ownerSurname: string;
    ownerProfileDescription: string;
    ownerUserType: number;
    ownerIsMale: boolean;
    ownerAccessLevel: number;
    ownerFriends: UserProfile[];
    ownerInvitedToFriends: UserProfile[];
    ownerFriendsInvitations: UserProfile[];
    profileId: string;
    ownerProfileId: string;
}
