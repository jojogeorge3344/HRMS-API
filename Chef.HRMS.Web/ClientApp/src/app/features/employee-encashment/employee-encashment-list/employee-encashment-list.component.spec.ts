import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeEncashmentListComponent } from './employee-encashment-list.component';

describe('EmployeeEncashmentListComponent', () => {
  let component: EmployeeEncashmentListComponent;
  let fixture: ComponentFixture<EmployeeEncashmentListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeEncashmentListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeEncashmentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
