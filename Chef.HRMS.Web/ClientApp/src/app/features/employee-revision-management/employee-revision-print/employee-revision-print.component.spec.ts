import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeRevisionPrintComponent } from './employee-revision-print.component';

describe('EmployeeRevisionPrintComponent', () => {
  let component: EmployeeRevisionPrintComponent;
  let fixture: ComponentFixture<EmployeeRevisionPrintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeRevisionPrintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeRevisionPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
