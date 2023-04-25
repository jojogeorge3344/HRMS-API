import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OvertimeRequestViewComponent } from './overtime-request-view.component';

describe('OvertimeRequestViewComponent', () => {
  let component: OvertimeRequestViewComponent;
  let fixture: ComponentFixture<OvertimeRequestViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OvertimeRequestViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OvertimeRequestViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
