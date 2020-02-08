import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessingErrorComponent } from './processing-error.component';

describe('ProcessingErrorComponent', () => {
  let component: ProcessingErrorComponent;
  let fixture: ComponentFixture<ProcessingErrorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcessingErrorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessingErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
