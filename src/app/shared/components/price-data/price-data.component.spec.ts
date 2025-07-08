import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceDataComponent } from './price-data.component';

describe('PriceDataComponent', () => {
  let component: PriceDataComponent;
  let fixture: ComponentFixture<PriceDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PriceDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PriceDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
