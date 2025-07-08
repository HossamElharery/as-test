import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArrayOfInputsComponent } from './array-of-inputs.component';

describe('ArrayOfInputsComponent', () => {
  let component: ArrayOfInputsComponent;
  let fixture: ComponentFixture<ArrayOfInputsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ArrayOfInputsComponent]
    });
    fixture = TestBed.createComponent(ArrayOfInputsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
