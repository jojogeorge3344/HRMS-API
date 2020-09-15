import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeAttendanceBulkUploadComponent } from './employee-attendance-bulk-upload.component';

describe('EmployeeAttendanceBulkUploadComponent', () => {
  let component: EmployeeAttendanceBulkUploadComponent;
  let fixture: ComponentFixture<EmployeeAttendanceBulkUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeAttendanceBulkUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeAttendanceBulkUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
