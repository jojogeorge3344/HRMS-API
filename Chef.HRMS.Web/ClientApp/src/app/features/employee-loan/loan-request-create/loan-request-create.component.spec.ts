import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanRequestCreateComponent } from './loan-request-create.component';

describe('LoanRequestCreateComponent', () => {
  let component: LoanRequestCreateComponent;
  let fixture: ComponentFixture<LoanRequestCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoanRequestCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanRequestCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
