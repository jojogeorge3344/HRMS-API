import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeWpsDetailsCreateComponent } from './employee-wps-details-create.component';

describe('EmployeeWpsDetailsCreateComponent', () => {
  let component: EmployeeWpsDetailsCreateComponent;
  let fixture: ComponentFixture<EmployeeWpsDetailsCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeWpsDetailsCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeWpsDetailsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
