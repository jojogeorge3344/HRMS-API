import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateAccrualsFinanceEntryComponent } from './generate-accruals-finance-entry.component';

describe('GenerateAccrualsFinanceEntryComponent', () => {
  let component: GenerateAccrualsFinanceEntryComponent;
  let fixture: ComponentFixture<GenerateAccrualsFinanceEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenerateAccrualsFinanceEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateAccrualsFinanceEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
