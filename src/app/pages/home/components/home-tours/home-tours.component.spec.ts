import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeToursComponent } from './home-tours.component';

describe('HomeToursComponent', () => {
  let component: HomeToursComponent;
  let fixture: ComponentFixture<HomeToursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeToursComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeToursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
