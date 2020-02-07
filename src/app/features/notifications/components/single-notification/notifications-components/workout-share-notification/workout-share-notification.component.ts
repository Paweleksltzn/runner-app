import { Component, OnInit, Input } from '@angular/core';
import { WorkoutShareNotification } from 'src/app/shared/interfaces/notifications/workoutShareNotification';
import { Workout } from 'src/app/shared/interfaces/workout/workout';

@Component({
  selector: 'app-workout-share-notification',
  templateUrl: './workout-share-notification.component.html',
  styleUrls: ['./workout-share-notification.component.scss'],
})
export class WorkoutShareNotificationComponent implements OnInit {
  @Input() sharedWorkoutNotification: WorkoutShareNotification;

  constructor() { }

  ngOnInit() {}

  public calcSeriesAmount(myWorkout: Workout) {
    return myWorkout.excercises.reduce((acc, element) => acc + element.series.length, 0);
  }

}
