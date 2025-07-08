import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SplanderComponent } from './splander.component';

describe('SplanderComponent', () => {
  let component: SplanderComponent;
  let fixture: ComponentFixture<SplanderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SplanderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SplanderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
   });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
