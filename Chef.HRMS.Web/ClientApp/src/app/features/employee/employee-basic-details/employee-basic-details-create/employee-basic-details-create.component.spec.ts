import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeBasicDetailsCreateComponent } from './employee-basic-details-create.component';

describe('EmployeeBasicDetailsCreateComponent', () => {
  let component: EmployeeBasicDetailsCreateComponent;
  let fixture: ComponentFixture<EmployeeBasicDetailsCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeBasicDetailsCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeBasicDetailsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
