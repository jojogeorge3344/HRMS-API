import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RaiseRequestListComponent } from './raise-request-list.component';

describe('RaiseRequestListComponent', () => {
  let component: RaiseRequestListComponent;
  let fixture: ComponentFixture<RaiseRequestListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RaiseRequestListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaiseRequestListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
