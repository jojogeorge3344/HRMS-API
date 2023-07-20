import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeEncashmentViewComponent } from './employee-encashment-view.component';

describe('EmployeeEncashmentViewComponent', () => {
  let component: EmployeeEncashmentViewComponent;
  let fixture: ComponentFixture<EmployeeEncashmentViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeEncashmentViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeEncashmentViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
