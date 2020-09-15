import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeDependentDetailsCreateComponent } from './employee-dependent-details-create.component';

describe('EmployeeDependentDetailsCreateComponent', () => {
  let component: EmployeeDependentDetailsCreateComponent;
  let fixture: ComponentFixture<EmployeeDependentDetailsCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeDependentDetailsCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeDependentDetailsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
