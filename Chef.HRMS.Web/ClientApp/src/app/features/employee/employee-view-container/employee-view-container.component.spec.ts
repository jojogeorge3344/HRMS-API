import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeViewContainerComponent } from './employee-view-container.component';

describe('EmployeeViewContainerComponent', () => {
  let component: EmployeeViewContainerComponent;
  let fixture: ComponentFixture<EmployeeViewContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeViewContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeViewContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
