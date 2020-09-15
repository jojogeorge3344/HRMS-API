import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeJobFilingEditComponent } from './employee-job-filing-edit.component';

describe('EmployeeJobFilingEditComponent', () => {
  let component: EmployeeJobFilingEditComponent;
  let fixture: ComponentFixture<EmployeeJobFilingEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeJobFilingEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeJobFilingEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
