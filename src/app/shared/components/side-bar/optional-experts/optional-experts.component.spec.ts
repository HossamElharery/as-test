import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionalExpertsComponent } from './optional-experts.component';

describe('OptionalExpertsComponent', () => {
  let component: OptionalExpertsComponent;
  let fixture: ComponentFixture<OptionalExpertsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OptionalExpertsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionalExpertsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
