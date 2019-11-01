import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachUserForGuestComponent } from './coach-user-for-guest.component';

describe('CoachUserForGuestComponent', () => {
  let component: CoachUserForGuestComponent;
  let fixture: ComponentFixture<CoachUserForGuestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoachUserForGuestComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoachUserForGuestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
