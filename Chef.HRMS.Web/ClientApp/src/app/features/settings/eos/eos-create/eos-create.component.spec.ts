import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EosCreateComponent } from './eos-create.component';

describe('EosCreateComponent', () => {
  let component: EosCreateComponent;
  let fixture: ComponentFixture<EosCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EosCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EosCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
