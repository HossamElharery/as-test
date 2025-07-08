import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiCountryPackagesComponent } from './multi-country-packages.component';

describe('MultiCountryPackagesComponent', () => {
  let component: MultiCountryPackagesComponent;
  let fixture: ComponentFixture<MultiCountryPackagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultiCountryPackagesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MultiCountryPackagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
