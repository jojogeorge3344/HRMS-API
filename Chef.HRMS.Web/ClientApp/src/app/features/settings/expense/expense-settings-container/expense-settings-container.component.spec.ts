import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseSettingsContainerComponent } from './expense-settings-container.component';

describe('ExpenseSettingsContainerComponent', () => {
  let component: ExpenseSettingsContainerComponent;
  let fixture: ComponentFixture<ExpenseSettingsContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpenseSettingsContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpenseSettingsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
