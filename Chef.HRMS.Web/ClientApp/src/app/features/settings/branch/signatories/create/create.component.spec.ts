import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSignatoryComponent } from './create.component';

describe('CreateComponent', () => {
  let component: CreateSignatoryComponent;
  let fixture: ComponentFixture<CreateSignatoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreateSignatoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSignatoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
