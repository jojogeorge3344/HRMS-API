import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeBasicDetailsViewComponent } from './employee-basic-details-view.component';

describe('EmployeeBasicDetailsViewComponent', () => {
  let component: EmployeeBasicDetailsViewComponent;
  let fixture: ComponentFixture<EmployeeBasicDetailsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeBasicDetailsViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeBasicDetailsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
