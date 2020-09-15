import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSignatoryComponent } from './edit.component';

describe('EditSignatoryComponent', () => {
  let component: EditSignatoryComponent;
  let fixture: ComponentFixture<EditSignatoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSignatoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSignatoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
