import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackageIncludedComponent } from './package-included.component';

describe('PackageIncludedComponent', () => {
  let component: PackageIncludedComponent;
  let fixture: ComponentFixture<PackageIncludedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PackageIncludedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PackageIncludedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
