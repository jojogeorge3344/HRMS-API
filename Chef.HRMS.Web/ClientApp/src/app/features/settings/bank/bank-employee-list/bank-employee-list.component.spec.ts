import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BankEmployeeListComponent } from './bank-employee-list.component';

describe('BankEmployeeListComponent', () => {
  let component: BankEmployeeListComponent;
  let fixture: ComponentFixture<BankEmployeeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BankEmployeeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BankEmployeeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
