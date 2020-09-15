import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RolesAssigningComponent } from './roles-assigning.component';

describe('RolesAssigningComponent', () => {
  let component: RolesAssigningComponent;
  let fixture: ComponentFixture<RolesAssigningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RolesAssigningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RolesAssigningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
