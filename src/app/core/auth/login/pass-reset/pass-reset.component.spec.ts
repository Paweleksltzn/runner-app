import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PassResetComponent } from './pass-reset.component';

describe('PassResetComponent', () => {
  let component: PassResetComponent;
  let fixture: ComponentFixture<PassResetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PassResetComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PassResetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
