import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllDestinationComponent } from './all-destination.component';

describe('AllDestinationComponent', () => {
  let component: AllDestinationComponent;
  let fixture: ComponentFixture<AllDestinationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllDestinationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllDestinationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
