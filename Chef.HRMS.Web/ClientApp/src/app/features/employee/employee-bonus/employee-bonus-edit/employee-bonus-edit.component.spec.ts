import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeBonusEditComponent } from './employee-bonus-edit.component';

describe('EmployeeBonusEditComponent', () => {
  let component: EmployeeBonusEditComponent;
  let fixture: ComponentFixture<EmployeeBonusEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeBonusEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeBonusEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
