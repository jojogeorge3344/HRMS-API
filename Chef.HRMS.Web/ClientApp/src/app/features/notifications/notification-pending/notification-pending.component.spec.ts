import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationPendingComponent } from './notification-pending.component';

describe('NotificationPendingComponent', () => {
  let component: NotificationPendingComponent;
  let fixture: ComponentFixture<NotificationPendingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificationPendingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationPendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
