import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserVariableViewComponent } from './user-variable-view.component';

describe('UserVariableViewComponent', () => {
  let component: UserVariableViewComponent;
  let fixture: ComponentFixture<UserVariableViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserVariableViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserVariableViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
