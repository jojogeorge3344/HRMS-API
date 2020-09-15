import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OvertimePolicyCalculationComponent } from './overtime-policy-calculation.component';

describe('OvertimePolicyCalculationComponent', () => {
  let component: OvertimePolicyCalculationComponent;
  let fixture: ComponentFixture<OvertimePolicyCalculationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OvertimePolicyCalculationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OvertimePolicyCalculationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
