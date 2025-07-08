import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartFromComponent } from './start-from.component';

describe('StartFromComponent', () => {
  let component: StartFromComponent;
  let fixture: ComponentFixture<StartFromComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StartFromComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StartFromComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
