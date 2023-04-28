import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeTicketCreateComponent } from './employee-ticket-create.component';

describe('EmployeeTicketCreateComponent', () => {
  let component: EmployeeTicketCreateComponent;
  let fixture: ComponentFixture<EmployeeTicketCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeTicketCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeTicketCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
