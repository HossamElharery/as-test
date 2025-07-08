import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsefulLinksIframeComponent } from './useful-links-iframe.component';

describe('UsefulLinksIframeComponent', () => {
  let component: UsefulLinksIframeComponent;
  let fixture: ComponentFixture<UsefulLinksIframeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsefulLinksIframeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsefulLinksIframeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
