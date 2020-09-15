import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanRequestViewComponent } from './loan-request-view.component';

describe('LoanRequestViewComponent', () => {
  let component: LoanRequestViewComponent;
  let fixture: ComponentFixture<LoanRequestViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoanRequestViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanRequestViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
