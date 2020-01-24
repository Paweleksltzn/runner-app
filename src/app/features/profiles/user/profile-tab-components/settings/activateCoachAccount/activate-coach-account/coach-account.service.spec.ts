import { TestBed } from '@angular/core/testing';

import { CoachAccountService } from './coach-account.service';

describe('CoachAccountService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CoachAccountService = TestBed.get(CoachAccountService);
    expect(service).toBeTruthy();
  });
});
