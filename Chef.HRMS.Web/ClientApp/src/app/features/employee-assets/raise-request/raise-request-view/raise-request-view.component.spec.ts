import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RaiseRequestViewComponent } from './raise-request-view.component';

describe('RaiseRequestViewComponent', () => {
  let component: RaiseRequestViewComponent;
  let fixture: ComponentFixture<RaiseRequestViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RaiseRequestViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaiseRequestViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
