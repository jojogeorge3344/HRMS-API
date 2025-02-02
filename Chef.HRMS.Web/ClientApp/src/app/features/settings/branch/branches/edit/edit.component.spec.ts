import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBranchComponent } from './edit.component';

describe('EditBranchComponent', () => {
  let component: EditBranchComponent;
  let fixture: ComponentFixture<EditBranchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditBranchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditBranchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
