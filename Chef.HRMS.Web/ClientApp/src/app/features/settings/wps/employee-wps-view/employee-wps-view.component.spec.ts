import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeWpsViewComponent } from './employee-wps-view.component';

describe('EmployeeWpsViewComponent', () => {
  let component: EmployeeWpsViewComponent;
  let fixture: ComponentFixture<EmployeeWpsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeWpsViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeWpsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
