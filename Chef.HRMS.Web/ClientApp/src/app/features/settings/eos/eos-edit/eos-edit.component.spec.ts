import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EosEditComponent } from './eos-edit.component';

describe('EosEditComponent', () => {
  let component: EosEditComponent;
  let fixture: ComponentFixture<EosEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EosEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EosEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
