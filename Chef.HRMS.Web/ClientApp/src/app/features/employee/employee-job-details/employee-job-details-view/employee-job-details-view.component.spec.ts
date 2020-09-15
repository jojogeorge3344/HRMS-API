import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeJobDetailsViewComponent } from './employee-job-details-view.component';

describe('EmployeeJobDetailsViewComponent', () => {
  let component: EmployeeJobDetailsViewComponent;
  let fixture: ComponentFixture<EmployeeJobDetailsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeJobDetailsViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeJobDetailsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
