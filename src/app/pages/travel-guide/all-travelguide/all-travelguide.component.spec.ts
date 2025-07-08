import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllTravelguideComponent } from './all-travelguide.component';

describe('AllTravelguideComponent', () => {
  let component: AllTravelguideComponent;
  let fixture: ComponentFixture<AllTravelguideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllTravelguideComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllTravelguideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
