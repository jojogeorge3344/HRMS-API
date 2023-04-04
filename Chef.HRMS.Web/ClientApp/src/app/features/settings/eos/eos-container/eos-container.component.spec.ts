import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EosContainerComponent } from './eos-container.component';

describe('EosContainerComponent', () => {
  let component: EosContainerComponent;
  let fixture: ComponentFixture<EosContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EosContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EosContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
