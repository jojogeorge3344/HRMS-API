import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeRequestsContainerComponent } from './employee-requests-container.component';

describe('EmployeeRequestsContainerComponent', () => {
  let component: EmployeeRequestsContainerComponent;
  let fixture: ComponentFixture<EmployeeRequestsContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeRequestsContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeRequestsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
