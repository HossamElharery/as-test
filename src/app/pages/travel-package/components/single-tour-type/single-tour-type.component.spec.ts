import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleTourTypeComponent } from './single-tour-type.component';

describe('SingleTourTypeComponent', () => {
  let component: SingleTourTypeComponent;
  let fixture: ComponentFixture<SingleTourTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleTourTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleTourTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
