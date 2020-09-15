import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayGroupListComponent } from './pay-group-list.component';

describe('PayGroupListComponent', () => {
  let component: PayGroupListComponent;
  let fixture: ComponentFixture<PayGroupListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayGroupListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayGroupListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
