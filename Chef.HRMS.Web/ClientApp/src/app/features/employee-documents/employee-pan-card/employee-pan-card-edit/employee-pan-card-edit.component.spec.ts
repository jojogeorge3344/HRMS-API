import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeePANCardEditComponent } from './employee-pan-card-edit.component';

describe('EmployeePANCardEditComponent', () => {
  let component: EmployeePANCardEditComponent;
  let fixture: ComponentFixture<EmployeePANCardEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeePANCardEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeePANCardEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
