import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeDependentDetailsViewComponent } from './employee-dependent-details-view.component';

describe('EmployeeDependentDetailsViewComponent', () => {
  let component: EmployeeDependentDetailsViewComponent;
  let fixture: ComponentFixture<EmployeeDependentDetailsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeDependentDetailsViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeDependentDetailsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
