import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllCruisesComponent } from './all-cruises.component';

describe('AllCruisesComponent', () => {
  let component: AllCruisesComponent;
  let fixture: ComponentFixture<AllCruisesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllCruisesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllCruisesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
