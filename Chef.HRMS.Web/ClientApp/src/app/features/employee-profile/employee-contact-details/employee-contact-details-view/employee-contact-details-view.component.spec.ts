import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeContactDetailsViewComponent } from './employee-contact-details-view.component';

describe('EmployeeContactDetailsViewComponent', () => {
  let component: EmployeeContactDetailsViewComponent;
  let fixture: ComponentFixture<EmployeeContactDetailsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeContactDetailsViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeContactDetailsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
