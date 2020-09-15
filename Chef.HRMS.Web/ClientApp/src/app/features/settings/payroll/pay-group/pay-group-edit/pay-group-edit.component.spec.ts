import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayGroupEditComponent } from './pay-group-edit.component';

describe('PayGroupEditComponent', () => {
  let component: PayGroupEditComponent;
  let fixture: ComponentFixture<PayGroupEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayGroupEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayGroupEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
