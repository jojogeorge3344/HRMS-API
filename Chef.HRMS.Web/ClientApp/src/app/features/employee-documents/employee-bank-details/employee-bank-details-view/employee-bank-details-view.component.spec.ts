import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeBankDetailsViewComponent } from './employee-bank-details-view.component';

describe('EmployeeBankDetailsViewComponent', () => {
  let component: EmployeeBankDetailsViewComponent;
  let fixture: ComponentFixture<EmployeeBankDetailsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeBankDetailsViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeBankDetailsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
