import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserVariableEditComponent } from './user-variable-edit.component';

describe('UserVariableEditComponent', () => {
  let component: UserVariableEditComponent;
  let fixture: ComponentFixture<UserVariableEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserVariableEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserVariableEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
