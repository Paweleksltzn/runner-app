import { TestBed } from '@angular/core/testing';

import { ToastGeneratorService } from './toast-generator.service';

describe('ToastGeneratorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ToastGeneratorService = TestBed.get(ToastGeneratorService);
    expect(service).toBeTruthy();
  });
});
