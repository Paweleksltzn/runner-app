import { TestBed } from '@angular/core/testing';

import { MyWorkoutService } from './my-workout.service';

describe('MyWorkoutService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MyWorkoutService = TestBed.get(MyWorkoutService);
    expect(service).toBeTruthy();
  });
});
