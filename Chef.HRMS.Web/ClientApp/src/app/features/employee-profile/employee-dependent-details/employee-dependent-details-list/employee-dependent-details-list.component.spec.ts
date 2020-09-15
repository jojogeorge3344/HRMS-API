import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeDependentDetailsListComponent } from './employee-dependent-details-list.component';

describe('EmployeeDependentDetailsListComponent', () => {
  let component: EmployeeDependentDetailsListComponent;
  let fixture: ComponentFixture<EmployeeDependentDetailsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeDependentDetailsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeDependentDetailsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
