import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NormalUserForGuestComponent } from './normal-user-for-guest.component';

describe('NormalUserForGuestComponent', () => {
  let component: NormalUserForGuestComponent;
  let fixture: ComponentFixture<NormalUserForGuestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NormalUserForGuestComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NormalUserForGuestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
