import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatedCardRibbonComponent } from './related-card-ribbon.component';

describe('RelatedCardRibbonComponent', () => {
  let component: RelatedCardRibbonComponent;
  let fixture: ComponentFixture<RelatedCardRibbonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RelatedCardRibbonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RelatedCardRibbonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
