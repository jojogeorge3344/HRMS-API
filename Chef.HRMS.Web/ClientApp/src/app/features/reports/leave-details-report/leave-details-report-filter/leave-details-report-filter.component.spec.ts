import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveDetailsReportFilterComponent } from './leave-details-report-filter.component';

describe('LeaveDetailsReportFilterComponent', () => {
  let component: LeaveDetailsReportFilterComponent;
  let fixture: ComponentFixture<LeaveDetailsReportFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeaveDetailsReportFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaveDetailsReportFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
