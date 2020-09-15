import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeDependentDetailsEditComponent } from './employee-dependent-details-edit.component';

describe('EmployeeDependentDetailsEditComponent', () => {
  let component: EmployeeDependentDetailsEditComponent;
  let fixture: ComponentFixture<EmployeeDependentDetailsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeDependentDetailsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeDependentDetailsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
