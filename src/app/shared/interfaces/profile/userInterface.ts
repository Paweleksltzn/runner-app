
export interface UserProfile {
    profileDescription: string;
    email: string;
    name: string;
    surname: string;
    gradient: number;
    imgUrl: string;
    userType: number;
    friends?: UserProfile[];
    invitedToFriends?: UserProfile[];
    friendsInvitations?: UserProfile[];
    isMyProfile: boolean;
}
