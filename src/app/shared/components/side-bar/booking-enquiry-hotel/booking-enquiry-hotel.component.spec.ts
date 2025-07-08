import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingEnquiryHotelComponent } from './booking-enquiry-hotel.component';

describe('BookingEnquiryHotelComponent', () => {
  let component: BookingEnquiryHotelComponent;
  let fixture: ComponentFixture<BookingEnquiryHotelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookingEnquiryHotelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookingEnquiryHotelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
