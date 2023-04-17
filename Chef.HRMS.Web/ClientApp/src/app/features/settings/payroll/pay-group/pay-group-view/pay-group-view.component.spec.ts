import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayGroupViewComponent } from './pay-group-view.component';

describe('PayGroupViewComponent', () => {
  let component: PayGroupViewComponent;
  let fixture: ComponentFixture<PayGroupViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayGroupViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayGroupViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
