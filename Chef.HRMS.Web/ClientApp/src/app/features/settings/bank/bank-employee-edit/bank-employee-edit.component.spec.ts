import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BankEmployeeEditComponent } from './bank-employee-edit.component';

describe('BankEmployeeEditComponent', () => {
  let component: BankEmployeeEditComponent;
  let fixture: ComponentFixture<BankEmployeeEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BankEmployeeEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BankEmployeeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
