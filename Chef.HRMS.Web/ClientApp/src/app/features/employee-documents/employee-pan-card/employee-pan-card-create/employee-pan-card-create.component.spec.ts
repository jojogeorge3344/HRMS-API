import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeePANCardCreateComponent } from './employee-pan-card-create.component';

describe('EmployeePANCardCreateComponent', () => {
  let component: EmployeePANCardCreateComponent;
  let fixture: ComponentFixture<EmployeePANCardCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeePANCardCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeePANCardCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
