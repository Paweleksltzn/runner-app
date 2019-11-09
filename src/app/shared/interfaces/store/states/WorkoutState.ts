
import { Subscription } from 'rxjs';
import { Workout } from '../../workout/workout';
import { TrainingTime } from '../../trainingTime';

export interface WorkoutState {
    currentWorkout: Workout;
    trainingTime: TrainingTime;
    isTimerOn: boolean;
    timerSubscription: Subscription;
    trainingMode: string;
    workoutToShow: Workout;
    historyWorkout: Workout;
}
