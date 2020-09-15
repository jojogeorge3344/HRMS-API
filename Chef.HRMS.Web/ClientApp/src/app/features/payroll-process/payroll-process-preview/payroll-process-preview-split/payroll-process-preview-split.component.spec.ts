import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollProcessPreviewSplitComponent } from './payroll-process-preview-split.component';

describe('PayrollProcessPreviewSplitComponent', () => {
  let component: PayrollProcessPreviewSplitComponent;
  let fixture: ComponentFixture<PayrollProcessPreviewSplitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayrollProcessPreviewSplitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayrollProcessPreviewSplitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
