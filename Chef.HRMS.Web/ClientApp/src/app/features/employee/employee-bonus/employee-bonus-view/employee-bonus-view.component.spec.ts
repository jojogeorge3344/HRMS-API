import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeBonusViewComponent } from './employee-bonus-view.component';

describe('EmployeeBonusViewComponent', () => {
  let component: EmployeeBonusViewComponent;
  let fixture: ComponentFixture<EmployeeBonusViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeBonusViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeBonusViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
