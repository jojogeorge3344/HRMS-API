import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeePANCardViewComponent } from './employee-pan-card-view.component';

describe('EmployeePANCardViewComponent', () => {
  let component: EmployeePANCardViewComponent;
  let fixture: ComponentFixture<EmployeePANCardViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeePANCardViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeePANCardViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
