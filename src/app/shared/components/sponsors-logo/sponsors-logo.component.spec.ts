import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SponsorsLogoComponent } from './sponsors-logo.component';

describe('SponsorsLogoComponent', () => {
  let component: SponsorsLogoComponent;
  let fixture: ComponentFixture<SponsorsLogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SponsorsLogoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SponsorsLogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
