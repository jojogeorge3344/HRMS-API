import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeTicketViewContainerComponent } from './employee-ticket-view-container.component';

describe('EmployeeTicketViewContainerComponent', () => {
  let component: EmployeeTicketViewContainerComponent;
  let fixture: ComponentFixture<EmployeeTicketViewContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeTicketViewContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeTicketViewContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
