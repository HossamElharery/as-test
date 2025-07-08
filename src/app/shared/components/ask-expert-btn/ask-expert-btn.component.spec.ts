import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AskExpertBtnComponent } from './ask-expert-btn.component';

describe('AskExpertBtnComponent', () => {
  let component: AskExpertBtnComponent;
  let fixture: ComponentFixture<AskExpertBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AskExpertBtnComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AskExpertBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
