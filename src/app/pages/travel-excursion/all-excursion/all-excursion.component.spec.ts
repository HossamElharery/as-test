import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllExcursionComponent } from './all-excursion.component';

describe('AllExcursionComponent', () => {
  let component: AllExcursionComponent;
  let fixture: ComponentFixture<AllExcursionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllExcursionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllExcursionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
