import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeEncashmentCreateComponent } from './employee-encashment-create.component';

describe('EmployeeEncashmentCreateComponent', () => {
  let component: EmployeeEncashmentCreateComponent;
  let fixture: ComponentFixture<EmployeeEncashmentCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeEncashmentCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeEncashmentCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
