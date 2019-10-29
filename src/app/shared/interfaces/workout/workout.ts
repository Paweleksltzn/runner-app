import { Excersise } from './exercise';
import { User } from '../auth/User';

export interface Workout {
    trainingDate?: string;
    duration?: number; // in seconds
    startTime?: number;
    title: string;
    excercises: Array<Excersise>;
    author?: User;
}
