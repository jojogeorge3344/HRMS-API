import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeEncashmentEditComponent } from './employee-encashment-edit.component';

describe('EmployeeEncashmentEditComponent', () => {
  let component: EmployeeEncashmentEditComponent;
  let fixture: ComponentFixture<EmployeeEncashmentEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeEncashmentEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeEncashmentEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
