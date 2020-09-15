import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollProcessPreviewListComponent } from './payroll-process-preview-list.component';

describe('PayrollProcessPreviewListComponent', () => {
  let component: PayrollProcessPreviewListComponent;
  let fixture: ComponentFixture<PayrollProcessPreviewListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayrollProcessPreviewListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayrollProcessPreviewListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
