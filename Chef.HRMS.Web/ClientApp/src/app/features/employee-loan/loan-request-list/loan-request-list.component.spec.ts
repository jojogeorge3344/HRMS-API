import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanRequestListComponent } from './loan-request-list.component';

describe('LoanRequestListComponent', () => {
  let component: LoanRequestListComponent;
  let fixture: ComponentFixture<LoanRequestListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoanRequestListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanRequestListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
