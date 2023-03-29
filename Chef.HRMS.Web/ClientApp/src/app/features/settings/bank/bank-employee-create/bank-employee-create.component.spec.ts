import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BankEmployeeCreateComponent } from './bank-employee-create.component';

describe('BankEmployeeCreateComponent', () => {
  let component: BankEmployeeCreateComponent;
  let fixture: ComponentFixture<BankEmployeeCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BankEmployeeCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BankEmployeeCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
