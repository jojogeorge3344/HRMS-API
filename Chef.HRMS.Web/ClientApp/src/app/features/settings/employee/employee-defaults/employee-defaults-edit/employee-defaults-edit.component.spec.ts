import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeDefaultsEditComponent } from './employee-defaults-edit.component';

describe('EmployeeDefaultsEditComponent', () => {
  let component: EmployeeDefaultsEditComponent;
  let fixture: ComponentFixture<EmployeeDefaultsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeDefaultsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeDefaultsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
