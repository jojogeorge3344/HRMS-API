import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeWFHListComponent } from './employee-wfh-list.component';

describe('EmployeeWFHListComponent', () => {
  let component: EmployeeWFHListComponent;
  let fixture: ComponentFixture<EmployeeWFHListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeWFHListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeWFHListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
