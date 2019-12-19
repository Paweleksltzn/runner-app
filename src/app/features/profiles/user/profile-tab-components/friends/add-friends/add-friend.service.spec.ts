import { TestBed } from '@angular/core/testing';

import { AddFriendService } from './add-friend.service';

describe('AddFriendService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AddFriendService = TestBed.get(AddFriendService);
    expect(service).toBeTruthy();
  });
});
