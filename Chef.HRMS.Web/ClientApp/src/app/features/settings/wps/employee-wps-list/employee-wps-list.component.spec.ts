import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeWpsListComponent } from './employee-wps-list.component';

describe('EmployeeWpsListComponent', () => {
  let component: EmployeeWpsListComponent;
  let fixture: ComponentFixture<EmployeeWpsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeWpsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeWpsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
