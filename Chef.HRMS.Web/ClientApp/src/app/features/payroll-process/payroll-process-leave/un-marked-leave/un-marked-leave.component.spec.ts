import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnMarkedLeaveComponent } from './un-marked-leave.component';

describe('UnMarkedLeaveComponent', () => {
  let component: UnMarkedLeaveComponent;
  let fixture: ComponentFixture<UnMarkedLeaveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnMarkedLeaveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnMarkedLeaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
