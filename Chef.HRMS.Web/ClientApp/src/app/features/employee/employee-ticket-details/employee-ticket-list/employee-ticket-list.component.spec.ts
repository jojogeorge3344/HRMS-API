import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeTicketListComponent } from './employee-ticket-list.component';

describe('EmployeeTicketListComponent', () => {
  let component: EmployeeTicketListComponent;
  let fixture: ComponentFixture<EmployeeTicketListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeTicketListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeTicketListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
