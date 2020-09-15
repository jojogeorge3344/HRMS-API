import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanRequestEditComponent } from './loan-request-edit.component';

describe('LoanRequestEditComponent', () => {
  let component: LoanRequestEditComponent;
  let fixture: ComponentFixture<LoanRequestEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoanRequestEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanRequestEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
