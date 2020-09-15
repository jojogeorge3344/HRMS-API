import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeCreateContainerComponent } from './employee-create-container.component';

describe('EmployeeCreateContainerComponent', () => {
  let component: EmployeeCreateContainerComponent;
  let fixture: ComponentFixture<EmployeeCreateContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeCreateContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeCreateContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
