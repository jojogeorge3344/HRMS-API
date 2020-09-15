import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeDefaultsViewComponent } from './employee-defaults-view.component';

describe('EmployeeDefaultsViewComponent', () => {
  let component: EmployeeDefaultsViewComponent;
  let fixture: ComponentFixture<EmployeeDefaultsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeDefaultsViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeDefaultsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
