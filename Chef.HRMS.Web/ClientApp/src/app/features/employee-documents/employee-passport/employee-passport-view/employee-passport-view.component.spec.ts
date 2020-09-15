import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeePassportViewComponent } from './employee-passport-view.component';

describe('EmployeePassportViewComponent', () => {
  let component: EmployeePassportViewComponent;
  let fixture: ComponentFixture<EmployeePassportViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeePassportViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeePassportViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
