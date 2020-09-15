import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseConfigurationPerdiemComponent } from './expense-configuration-perdiem.component';

describe('ExpenseConfigurationPerdiemComponent', () => {
  let component: ExpenseConfigurationPerdiemComponent;
  let fixture: ComponentFixture<ExpenseConfigurationPerdiemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpenseConfigurationPerdiemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpenseConfigurationPerdiemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
