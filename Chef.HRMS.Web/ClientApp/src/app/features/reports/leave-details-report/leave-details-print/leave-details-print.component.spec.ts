import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveDetailsPrintComponent } from './leave-details-print.component';

describe('LeaveDetailsPrintComponent', () => {
  let component: LeaveDetailsPrintComponent;
  let fixture: ComponentFixture<LeaveDetailsPrintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeaveDetailsPrintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaveDetailsPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
