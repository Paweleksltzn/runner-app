import { TestBed } from '@angular/core/testing';

import { ActiveWorkoutService } from './active-workout.service';

describe('ActiveWorkoutService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ActiveWorkoutService = TestBed.get(ActiveWorkoutService);
    expect(service).toBeTruthy();
  });
});
