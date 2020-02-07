import { Notification } from './notification';
import { Workout } from '../workout/workout';

export interface WorkoutShareNotification extends Notification {
    sharedWorkoutsList: Workout[];
}
