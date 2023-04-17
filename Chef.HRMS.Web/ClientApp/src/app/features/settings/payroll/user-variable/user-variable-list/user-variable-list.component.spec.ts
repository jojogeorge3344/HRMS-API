import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserVariableListComponent } from './user-variable-list.component';

describe('UserVariableListComponent', () => {
  let component: UserVariableListComponent;
  let fixture: ComponentFixture<UserVariableListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserVariableListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserVariableListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
