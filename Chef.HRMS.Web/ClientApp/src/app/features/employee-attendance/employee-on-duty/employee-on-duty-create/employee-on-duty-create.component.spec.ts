import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeOnDutyCreateComponent } from './employee-on-duty-create.component';

describe('EmployeeOnDutyCreateComponent', () => {
  let component: EmployeeOnDutyCreateComponent;
  let fixture: ComponentFixture<EmployeeOnDutyCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeOnDutyCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeOnDutyCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
