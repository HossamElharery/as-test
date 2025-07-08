import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CityExcursionComponent } from './city-excursion.component';

describe('CityExcursionComponent', () => {
  let component: CityExcursionComponent;
  let fixture: ComponentFixture<CityExcursionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CityExcursionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CityExcursionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
