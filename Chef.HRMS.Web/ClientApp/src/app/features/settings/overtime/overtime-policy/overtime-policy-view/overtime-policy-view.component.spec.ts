import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OvertimePolicyViewComponent } from './overtime-policy-view.component';

describe('OvertimePolicyViewComponent', () => {
  let component: OvertimePolicyViewComponent;
  let fixture: ComponentFixture<OvertimePolicyViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OvertimePolicyViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OvertimePolicyViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
