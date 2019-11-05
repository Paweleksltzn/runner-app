import { Workout } from './workout';
import { TrainingTime } from '../trainingTime';
import { Subscription } from 'rxjs';

export interface WorkoutState {
    currentWorkout: Workout;
    trainingTime: TrainingTime;
    isTimerOn: boolean;
    timerSubscription: Subscription;
    trainingMode: string;
    workoutToShow: Workout;
    historyWorkout: Workout;
}
