import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveRequestPrintComponent } from './leave-request-print.component';

describe('LeaveRequestPrintComponent', () => {
  let component: LeaveRequestPrintComponent;
  let fixture: ComponentFixture<LeaveRequestPrintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeaveRequestPrintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaveRequestPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
