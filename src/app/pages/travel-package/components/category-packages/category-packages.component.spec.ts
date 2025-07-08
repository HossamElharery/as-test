import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryPackagesComponent } from './category-packages.component';

describe('CategoryPackagesComponent', () => {
  let component: CategoryPackagesComponent;
  let fixture: ComponentFixture<CategoryPackagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryPackagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryPackagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
