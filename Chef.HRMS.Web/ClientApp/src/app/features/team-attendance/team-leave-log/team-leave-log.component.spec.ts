import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamLeaveLogComponent } from './team-leave-log.component';

describe('TeamLeaveLogComponent', () => {
  let component: TeamLeaveLogComponent;
  let fixture: ComponentFixture<TeamLeaveLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamLeaveLogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamLeaveLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
