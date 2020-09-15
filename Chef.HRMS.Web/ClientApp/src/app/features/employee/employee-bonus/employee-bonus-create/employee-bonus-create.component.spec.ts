import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeBonusCreateComponent } from './employee-bonus-create.component';

describe('EmployeeBonusCreateComponent', () => {
  let component: EmployeeBonusCreateComponent;
  let fixture: ComponentFixture<EmployeeBonusCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeBonusCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeBonusCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
