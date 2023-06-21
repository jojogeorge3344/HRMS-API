import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayslipComponentsListComponent } from './payslip-components-list.component';

describe('PayslipComponentsListComponent', () => {
  let component: PayslipComponentsListComponent;
  let fixture: ComponentFixture<PayslipComponentsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayslipComponentsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayslipComponentsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
