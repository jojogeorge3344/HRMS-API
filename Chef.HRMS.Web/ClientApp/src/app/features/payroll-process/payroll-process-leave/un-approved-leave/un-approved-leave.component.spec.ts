import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnApprovedLeaveComponent } from './un-approved-leave.component';

describe('UnApprovedLeaveComponent', () => {
  let component: UnApprovedLeaveComponent;
  let fixture: ComponentFixture<UnApprovedLeaveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnApprovedLeaveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnApprovedLeaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
