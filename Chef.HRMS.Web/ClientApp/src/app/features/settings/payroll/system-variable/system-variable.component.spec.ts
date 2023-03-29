import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemVariableComponent } from './system-variable.component';

describe('SystemVariableComponent', () => {
  let component: SystemVariableComponent;
  let fixture: ComponentFixture<SystemVariableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemVariableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemVariableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
