import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollStructureCreateComponent } from './payroll-structure-create.component';

describe('PayrollStructureCreateComponent', () => {
  let component: PayrollStructureCreateComponent;
  let fixture: ComponentFixture<PayrollStructureCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayrollStructureCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayrollStructureCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
