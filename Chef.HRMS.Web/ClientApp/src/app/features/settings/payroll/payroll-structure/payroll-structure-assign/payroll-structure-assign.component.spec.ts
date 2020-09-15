import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollStructureAssignComponent } from './payroll-structure-assign.component';

describe('PayrollStructureAssignComponent', () => {
  let component: PayrollStructureAssignComponent;
  let fixture: ComponentFixture<PayrollStructureAssignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayrollStructureAssignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayrollStructureAssignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
