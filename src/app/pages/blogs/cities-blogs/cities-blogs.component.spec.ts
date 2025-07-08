import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitiesBlogsComponent } from './cities-blogs.component';

describe('CitiesBlogsComponent', () => {
  let component: CitiesBlogsComponent;
  let fixture: ComponentFixture<CitiesBlogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CitiesBlogsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CitiesBlogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
