import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeWpsEditComponent } from './employee-wps-edit.component';

describe('EmployeeWpsEditComponent', () => {
  let component: EmployeeWpsEditComponent;
  let fixture: ComponentFixture<EmployeeWpsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeWpsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeWpsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
