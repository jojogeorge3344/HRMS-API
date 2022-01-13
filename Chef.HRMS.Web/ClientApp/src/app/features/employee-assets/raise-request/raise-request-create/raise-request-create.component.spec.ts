import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RaiseRequestCreateComponent } from './raise-request-create.component';

describe('RaiseRequestCreateComponent', () => {
  let component: RaiseRequestCreateComponent;
  let fixture: ComponentFixture<RaiseRequestCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RaiseRequestCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaiseRequestCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
