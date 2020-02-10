import { Excersise } from './exercise';
import { User } from '../auth/User';

export interface Workout {
    trainingDate?: string;
    duration?: string | number;
    startTime?: number;
    title: string;
    excercises: Array<Excersise>;
    creationDate?: Date;
    author?: User | string;
    _id?: string;
}
