import { Workout } from '../../workout/workout';

export interface MyWorkoutState {
    workoutsList: Workout[];
    isStateLoaded: boolean;
}
