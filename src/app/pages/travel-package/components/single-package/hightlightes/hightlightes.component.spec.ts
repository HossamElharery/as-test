import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HightlightesComponent } from './hightlightes.component';

describe('Hightlightes.Component', () => {
  let component: HightlightesComponent;
  let fixture: ComponentFixture<HightlightesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HightlightesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HightlightesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
