import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollProcessCreateContainerComponent } from './payroll-process-create-container.component';

describe('PayrollProcessCreateContainerComponent', () => {
  let component: PayrollProcessCreateContainerComponent;
  let fixture: ComponentFixture<PayrollProcessCreateContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayrollProcessCreateContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayrollProcessCreateContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
