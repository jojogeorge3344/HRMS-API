import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OvertimePolicyCreateComponent } from './overtime-policy-create.component';

describe('OvertimePolicyCreateComponent', () => {
  let component: OvertimePolicyCreateComponent;
  let fixture: ComponentFixture<OvertimePolicyCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OvertimePolicyCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OvertimePolicyCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
