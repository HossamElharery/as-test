import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerfiedAgentComponent } from './verfied-agent.component';

describe('VerfiedAgentComponent', () => {
  let component: VerfiedAgentComponent;
  let fixture: ComponentFixture<VerfiedAgentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerfiedAgentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerfiedAgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
