import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeJobFilingCreateComponent } from './employee-job-filing-create.component';

describe('EmployeeJobFilingCreateComponent', () => {
  let component: EmployeeJobFilingCreateComponent;
  let fixture: ComponentFixture<EmployeeJobFilingCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeJobFilingCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeJobFilingCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
