import { TestBed } from '@angular/core/testing';

import { LocalNotificationsGeneratorService } from './local-notifications-generator.service';

describe('LocalNotificationsGeneratorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LocalNotificationsGeneratorService = TestBed.get(LocalNotificationsGeneratorService);
    expect(service).toBeTruthy();
  });
});
