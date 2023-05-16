import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanRequestPrintComponent } from './loan-request-print.component';

describe('LoanRequestPrintComponent', () => {
  let component: LoanRequestPrintComponent;
  let fixture: ComponentFixture<LoanRequestPrintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoanRequestPrintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanRequestPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
