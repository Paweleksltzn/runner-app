import { Achievment } from './achievment';

export interface UserProfile {
    profileDescription: string;
    email: string;
    name: string;
    surname: string;
    isMale: boolean;
    accessLevel: number;
    gradient: number;
    imgUrl: string;
    userType: number;
    croppedImage: string;
    isFriend?: boolean;
    friends?: UserProfile[];
    invitedToFriends?: UserProfile[];
    friendsInvitations?: UserProfile[];
    isMyProfile: boolean;
    ratesAmount: number;
    ratesSum: number;
    achievments: Achievment[];
    ratedTrainers: {
        trainer: UserProfile,
        rate: number
    }[];
    _id?: string;
}
