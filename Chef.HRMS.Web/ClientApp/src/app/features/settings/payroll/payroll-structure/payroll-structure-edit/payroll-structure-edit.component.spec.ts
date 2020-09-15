import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollStructureEditComponent } from './payroll-structure-edit.component';

describe('PayrollStructureEditComponent', () => {
  let component: PayrollStructureEditComponent;
  let fixture: ComponentFixture<PayrollStructureEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayrollStructureEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayrollStructureEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
