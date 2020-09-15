import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeUIDViewComponent } from './employee-uid-view.component';

describe('EmployeeUIDViewComponent', () => {
  let component: EmployeeUIDViewComponent;
  let fixture: ComponentFixture<EmployeeUIDViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeUIDViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeUIDViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
