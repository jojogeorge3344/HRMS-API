import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeePrimaryDetailsViewComponent } from './employee-primary-details-view.component';

describe('EmployeePrimaryDetailsViewComponent', () => {
  let component: EmployeePrimaryDetailsViewComponent;
  let fixture: ComponentFixture<EmployeePrimaryDetailsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeePrimaryDetailsViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeePrimaryDetailsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
