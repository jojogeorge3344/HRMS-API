import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OvertimePolicyEditComponent } from './overtime-policy-edit.component';

describe('OvertimePolicyEditComponent', () => {
  let component: OvertimePolicyEditComponent;
  let fixture: ComponentFixture<OvertimePolicyEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OvertimePolicyEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OvertimePolicyEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
