import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeWpsCreateComponent } from './employee-wps-create.component';

describe('EmployeeWpsCreateComponent', () => {
  let component: EmployeeWpsCreateComponent;
  let fixture: ComponentFixture<EmployeeWpsCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeWpsCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeWpsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
