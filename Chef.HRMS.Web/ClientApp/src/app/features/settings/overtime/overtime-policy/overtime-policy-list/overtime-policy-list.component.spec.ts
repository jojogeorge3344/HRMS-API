import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OvertimePolicyListComponent } from './overtime-policy-list.component';

describe('OvertimePolicyListComponent', () => {
  let component: OvertimePolicyListComponent;
  let fixture: ComponentFixture<OvertimePolicyListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OvertimePolicyListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OvertimePolicyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
