import { User } from '../auth/User';

export interface UserProfile extends User {
    profileDescription: string;
    gradient: number;
    imgUrl: string;
    userType: number;
    friends: number,
    isMyProfile: boolean,
}
