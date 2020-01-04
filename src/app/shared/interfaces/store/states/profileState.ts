import { User } from '../../auth/User';

export interface ProfileState {
    gradient: number;
    profImgUrl: string;
    email: string;
    name: string;
    surname: string;
    profileDesc: string;
    userType: number;
    friends: User[];
    isMyProfile: boolean;
    isMale: boolean;
    accessLevel: number;
}
