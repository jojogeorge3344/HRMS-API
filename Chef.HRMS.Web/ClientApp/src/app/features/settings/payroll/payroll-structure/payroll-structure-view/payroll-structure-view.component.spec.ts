import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollStructureViewComponent } from './payroll-structure-view.component';

describe('PayrollStructureViewComponent', () => {
  let component: PayrollStructureViewComponent;
  let fixture: ComponentFixture<PayrollStructureViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayrollStructureViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayrollStructureViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
