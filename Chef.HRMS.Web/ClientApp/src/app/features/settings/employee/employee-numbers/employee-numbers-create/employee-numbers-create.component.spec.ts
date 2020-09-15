import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeNumbersCreateComponent } from './employee-numbers-create.component';

describe('EmployeeNumbersCreateComponent', () => {
  let component: EmployeeNumbersCreateComponent;
  let fixture: ComponentFixture<EmployeeNumbersCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeNumbersCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeNumbersCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
