import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OvertimeRequestCreateComponent } from './overtime-request-create.component';

describe('OvertimeRequestCreateComponent', () => {
  let component: OvertimeRequestCreateComponent;
  let fixture: ComponentFixture<OvertimeRequestCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OvertimeRequestCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OvertimeRequestCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
