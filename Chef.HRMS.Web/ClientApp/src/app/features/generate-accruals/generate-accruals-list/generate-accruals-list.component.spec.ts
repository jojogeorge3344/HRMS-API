import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateAccrualsListComponent } from './generate-accruals-list.component';

describe('GenerateAccrualsListComponent', () => {
  let component: GenerateAccrualsListComponent;
  let fixture: ComponentFixture<GenerateAccrualsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenerateAccrualsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateAccrualsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
