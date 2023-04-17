import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserVariableCreateComponent } from './user-variable-create.component';

describe('UserVariableCreateComponent', () => {
  let component: UserVariableCreateComponent;
  let fixture: ComponentFixture<UserVariableCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserVariableCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserVariableCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
