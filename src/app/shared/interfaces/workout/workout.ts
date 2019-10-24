import { Excersise } from './exercise';
import { User } from '../auth/User';

export interface Workout {
    trainingDate?: Date;
    duration?: number; // in seconds
    title: string;
    excercises: Array<Excersise>;
    author?: User;
}
