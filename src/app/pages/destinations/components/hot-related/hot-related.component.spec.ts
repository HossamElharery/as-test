import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotRelatedComponent } from './hot-related.component';

describe('HotRelatedComponent', () => {
  let component: HotRelatedComponent;
  let fixture: ComponentFixture<HotRelatedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HotRelatedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HotRelatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
