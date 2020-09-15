import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeNumbersListComponent } from './employee-numbers-list.component';

describe('EmployeeNumbersListComponent', () => {
  let component: EmployeeNumbersListComponent;
  let fixture: ComponentFixture<EmployeeNumbersListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeNumbersListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeNumbersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
