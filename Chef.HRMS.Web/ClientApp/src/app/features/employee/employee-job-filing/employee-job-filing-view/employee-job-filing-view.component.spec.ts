import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeJobFilingViewComponent } from './employee-job-filing-view.component';

describe('EmployeeJobFilingViewComponent', () => {
  let component: EmployeeJobFilingViewComponent;
  let fixture: ComponentFixture<EmployeeJobFilingViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeJobFilingViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeJobFilingViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
