import { User } from '../../auth/User';

export interface ProfileState extends User {
    gradient: number;
    profImgUrl: string;
    profileDesc: string;
    userType: number;
    friends: User[];
    isMyProfile: boolean;
    accessLevel: number;
}
