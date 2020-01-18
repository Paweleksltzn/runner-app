
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
    friends?: UserProfile[];
    invitedToFriends?: UserProfile[];
    friendsInvitations?: UserProfile[];
    isMyProfile: boolean;
    _id?: string;
}
