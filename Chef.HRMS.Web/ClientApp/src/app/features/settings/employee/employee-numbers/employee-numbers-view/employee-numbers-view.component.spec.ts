import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeNumbersViewComponent } from './employee-numbers-view.component';

describe('EmployeeNumbersViewComponent', () => {
  let component: EmployeeNumbersViewComponent;
  let fixture: ComponentFixture<EmployeeNumbersViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeNumbersViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeNumbersViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
