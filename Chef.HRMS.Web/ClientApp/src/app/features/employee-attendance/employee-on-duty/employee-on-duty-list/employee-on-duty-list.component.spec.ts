import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeOnDutyListComponent } from './employee-on-duty-list.component';

describe('EmployeeOnDutyListComponent', () => {
  let component: EmployeeOnDutyListComponent;
  let fixture: ComponentFixture<EmployeeOnDutyListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeOnDutyListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeOnDutyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
