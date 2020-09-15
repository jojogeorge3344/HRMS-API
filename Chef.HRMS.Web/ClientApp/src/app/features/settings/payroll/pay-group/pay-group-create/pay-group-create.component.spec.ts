import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayGroupCreateComponent } from './pay-group-create.component';

describe('PayGroupCreateComponent', () => {
  let component: PayGroupCreateComponent;
  let fixture: ComponentFixture<PayGroupCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayGroupCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayGroupCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
