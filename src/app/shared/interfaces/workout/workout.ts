import { Excersise } from './exercise';
import { User } from '../auth/User';

export interface Workout {
    trainingDate?: string;
    duration?: string | number;
    startTime?: number;
    title: string;
    excercises: Array<Excersise>;
    author?: User;
    _id?: string;
}
