import { Excersise } from './exercise';

export interface Workout {
    trainingDate?: Date;
    duration?: number; // in seconds
    title: string;
    excercises: Array<Excersise>;
}
