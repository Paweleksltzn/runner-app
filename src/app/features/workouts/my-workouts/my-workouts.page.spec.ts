import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyWorkoutsPage } from './my-workouts.page';

describe('MyWorkoutsPage', () => {
  let component: MyWorkoutsPage;
  let fixture: ComponentFixture<MyWorkoutsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyWorkoutsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyWorkoutsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
