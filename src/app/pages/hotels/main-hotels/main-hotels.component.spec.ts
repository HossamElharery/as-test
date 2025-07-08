import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainHotelsComponent } from './main-hotels.component';

describe('MainHotelsComponent', () => {
  let component: MainHotelsComponent;
  let fixture: ComponentFixture<MainHotelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainHotelsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainHotelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
