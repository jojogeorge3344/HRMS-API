import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RaiseRequestEditComponent } from './raise-request-edit.component';

describe('RaiseRequestEditComponent', () => {
  let component: RaiseRequestEditComponent;
  let fixture: ComponentFixture<RaiseRequestEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RaiseRequestEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaiseRequestEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
