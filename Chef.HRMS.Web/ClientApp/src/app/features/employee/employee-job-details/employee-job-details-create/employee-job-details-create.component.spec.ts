import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeJobDetailsCreateComponent } from './employee-job-details-create.component';

describe('EmployeeJobDetailsCreateComponent', () => {
  let component: EmployeeJobDetailsCreateComponent;
  let fixture: ComponentFixture<EmployeeJobDetailsCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeJobDetailsCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeJobDetailsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
