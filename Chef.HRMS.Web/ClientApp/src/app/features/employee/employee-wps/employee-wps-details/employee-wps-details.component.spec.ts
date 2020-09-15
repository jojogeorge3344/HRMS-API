import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeWpsDetailsComponent } from './employee-wps-details.component';

describe('EmployeeWpsDetailsComponent', () => {
  let component: EmployeeWpsDetailsComponent;
  let fixture: ComponentFixture<EmployeeWpsDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeWpsDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeWpsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
