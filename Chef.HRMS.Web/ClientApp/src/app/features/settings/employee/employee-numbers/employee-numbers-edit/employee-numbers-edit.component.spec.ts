import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeNumbersEditComponent } from './employee-numbers-edit.component';

describe('EmployeeNumbersEditComponent', () => {
  let component: EmployeeNumbersEditComponent;
  let fixture: ComponentFixture<EmployeeNumbersEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeNumbersEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeNumbersEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
