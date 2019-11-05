import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Workout } from 'src/app/shared/interfaces/workout/workout';
import { environment } from 'src/environments/environment';
import { Store, select } from '@ngrx/store';
import { MyWorkoutState } from 'src/app/shared/interfaces/my-workouts/myWorkoutState';
import { actions } from 'src/app/store';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MyWorkoutService {

  constructor(private http: HttpClient, private store: Store<{myWorkouts: MyWorkoutState}>) { }

  public saveUserWorkouts(workouts: Workout[]) {
    return this.http.post(`${environment.srvAddress}/${environment.endpoints.workout}/list`, { workouts }).subscribe(response => {
      // brak reakcji -> success
    });
  }

  public loadUserWorkoutsToStore(): void {
    let storeSubscription: Subscription;
    this.http.get(`${environment.srvAddress}/${environment.endpoints.workout}/list/all`).subscribe((userWorkouts: Workout[]) => {
      storeSubscription = this.store.pipe(select('myWorkouts')).subscribe((state: MyWorkoutState) => {
        if (!state.isStateLoaded) {
         this.store.dispatch(actions.myWorkoutActions.loadWorkoutsList({ workoutsList: userWorkouts }));
        }
      });
      storeSubscription.unsubscribe();
    });
  }
}
