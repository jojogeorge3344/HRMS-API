import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeWFHCreateComponent } from './employee-wfh-create.component';

describe('EmployeeWFHCreateComponent', () => {
  let component: EmployeeWFHCreateComponent;
  let fixture: ComponentFixture<EmployeeWFHCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeWFHCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeWFHCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
