import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveWorkoutPage } from './active-workout.page';

describe('ActiveWorkoutPage', () => {
  let component: ActiveWorkoutPage;
  let fixture: ComponentFixture<ActiveWorkoutPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActiveWorkoutPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveWorkoutPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
