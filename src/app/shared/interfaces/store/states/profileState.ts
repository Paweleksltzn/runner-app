import { User } from '../../auth/User';
import { UserProfile } from '../../profile/userInterface';
import { Achievment } from '../../profile/achievment';

export interface ProfileState extends User {
    gradient: number;
    imgUrl: string;
    profileDescription: string;
    isMyProfile: boolean;
    accessLevel: number;
    croppedImageUrl?: string;
    invitedToFriends?: UserProfile[];
    friendsInvitations?: UserProfile[];
    friends?: UserProfile[];
    ownerGradient: number;
    ownerImgUrl: string;
    ownerEmail: string;
    ownerName: string;
    ownerSurname: string;
    ownerProfileDescription: string;
    ownerIsMale: boolean;
    ownerAccessLevel: number;
    ownerFriends: UserProfile[];
    ownerInvitedToFriends: UserProfile[];
    ownerFriendsInvitations: UserProfile[];
    profileId: string;
    ownerProfileId: string;
    ratesAmount: number;
    ratesSum: number;
    ownerRatesAmount: number;
    ownerRatesSum: number;
    ownerAchievments: Achievment[];
    achievments: Achievment[],
    ratedTrainers: {
        trainer: UserProfile,
        rate: number
    }[];
}
